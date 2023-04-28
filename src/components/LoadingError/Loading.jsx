import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center">
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ width: "50px", height: "50px", color: "#3471db" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;