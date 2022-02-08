import PropTypes from "prop-types";

import "./index.css";

export const SearchBar = (props) => {
  const { placeholder, handleChange, onSearch, searchValue } = props;
  return (
    <div className="input-group rounded searchbar-wrapper">
      <input
        type="search"
        className="form-control rounded searchbar"
        placeholder={placeholder}
        // value={searchValue}
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={(e) => handleChange(e)}
      />
      {/* <i className="bi bi-search"/> */}
      <span className="input-group-text border-0" id="search-addon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search search-icon"
          viewBox="0 0 16 16"
          onClick={() => onSearch()}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </span>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  onSearch: PropTypes.func,
};

SearchBar.defaultProps = {
  placeholder: "",
  handleChange: () => {},
  onSearch: () => {},
};
