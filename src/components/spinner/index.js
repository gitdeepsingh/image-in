import PropTypes from "prop-types";

import "./index.css";

export const AppSpinner = (props) => {
  const { customClass } = props;
  return (
    <div className={`spinner-wrapper ${customClass}`}>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading results...</span>
        </div>
      </div>
    </div>
  );
};

AppSpinner.propTypes = {
  customClass: PropTypes.string,
};

AppSpinner.defaultProps = {
  customClass: "",
};
