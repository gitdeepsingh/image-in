import React, { Component } from "react";
import { connect } from "react-redux";
import { SearchBar, AppSpinner, ToastMessager } from "../../components";
import { setSearchedValue } from "./actions";
import config from './../../common/config';

import "./index.css";

class ImageSearchEngine extends Component {
  constructor() {
    super();
    this.state = {
      searchValue: "",
      imagesDisplayed: [],
      imagesCount: null,
      pageLoaded: 1,
      loading: false,
      isServiceError: false,
    };
  }

  handleSearchSuccess = (data, isFresh) => {
    const { pageLoaded, imagesDisplayed } = this.state;
    const parsedData = JSON.parse(data);
    this.setState({ isServiceError: false });
    if (!isFresh && pageLoaded > 1) {
      let imgArr = imagesDisplayed;
      parsedData?.results.forEach((item) => {
        imgArr.push(Object.assign({}, item));
      });
      this.setState({ imagesDisplayed: imgArr });
    } else {
      this.setState({ imagesDisplayed: parsedData?.results || [] });
      this.setState({ imagesCount: parsedData.total });
    }
  };

  handleSearchFailure = () => {
    this.setState({ isServiceError: true, imagesDisplayed: [] });
  };

  fetchSearchResults = (isFresh = false) => {
    const { searchValue, pageLoaded } = this.state;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${config.SECRET}`,
        "Content-Type": "application/json",
        "Accept-Version": "v1",
      },
    };
    this.setState({ loading: true });
    fetch(
      `https://api.unsplash.com/search/photos?page=${pageLoaded}&query=${searchValue}`,
      options
    )
      .then((res) => {
        return new Response(res?.body, {
          headers: { "Content-Type": "application/hjson" },
        }).text();
      })
      .then((data) => {
        if (data) this.handleSearchSuccess(data, isFresh);
        else this.setState({ imagesDisplayed: [] });
      })
      .catch((err) => {
        console.log("service_not_reachable. Reason=", err); // err is always an array
        this.handleSearchFailure();
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onSearchClick = () => {
    const { searchValue } = this.state;
    if (searchValue) {
      this.fetchSearchResults(true);
    } else {
      this.setState({ imagesDisplayed: [] });
    }
    this.props.setSearchedValue(searchValue);
  };

  renderSearchResults = () => {
    const { imagesDisplayed } = this.state;
    return imagesDisplayed.map((item, i) => {
      return (
        <img
          key={i}
          src={item.urls.thumb} // small, thumb, raw, regular
          width={120}
          height={120}
          className="display-image"
        />
      );
    });
  };

  loadMore = () => {
    this.setState({ pageLoaded: this.state.pageLoaded + 1 }, () => {
      this.fetchSearchResults(false);
    });
  };

  handleChange = (e) => {
    this.setState({ searchValue: e.target.value.trim().toLowerCase() });
  };

  render() {
    const {
      imagesDisplayed,
      imagesCount,
      pageLoaded,
      loading,
      isServiceError,
    } = this.state;
    const { searchedValue } = this.props;
    const isFreshLoad = pageLoaded === 1;
    return (
      <>
        <SearchBar
          placeholder="Search for photos"
          handleChange={this.handleChange}
          onSearch={this.onSearchClick}
          // searchValue={this.searched}
        />
        {loading && isFreshLoad ? (
          <AppSpinner />
        ) : (
          <>
            {" "}
            {imagesCount > 0 && imagesDisplayed.length > 0 && (
              <div className="results-count">
                <h3>{searchedValue}</h3>
                <p>{`${imagesCount} images have been found`}</p>
              </div>
            )}
            {imagesDisplayed.length ? (
              <div className="images-wrapper">{this.renderSearchResults()}</div>
            ) : (
              <div></div>
            )}
            {loading && !isFreshLoad ? (
              <div className="loadingmore-text">loading...</div>
            ) : (
              imagesCount > 11 &&
              imagesDisplayed.length > 0 && (
                <button
                  className="loadmore-btn"
                  onClick={() => this.loadMore()}
                >
                  Load More
                </button>
              )
            )}
          </>
        )}
        {isServiceError && <ToastMessager />}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchedValue: state?.searchEngineReducers?.searchedValue || "",
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setSearchedValue: (v) => {
      dispatch(setSearchedValue(v));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSearchEngine);
