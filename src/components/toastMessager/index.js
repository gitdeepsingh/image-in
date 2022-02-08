import "./index.css";

export const ToastMessager = (props) => {

  return (
    <>
      <div className="toast toast-wrapper" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="mr-auto">Opps! Something went wrong</strong>
        </div>
        <div className="toast-body">
          we are unable to fulfill your request currently. Please try again
          after sometime.
        </div>
      </div>
    </>
  );
};
