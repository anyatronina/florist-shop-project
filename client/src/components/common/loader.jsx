import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <div className="spinner-border" role="status">
        <span className="sr-only" />
      </div>
    </div>
  );
};

export default Loader;
