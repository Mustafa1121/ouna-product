import React from "react";
import Checkbox from "./CheckBox";

const Register = ({ containerRef }) => {
  return (
    <>
      <div className="base-containerF" ref={containerRef}>
        <div className="Checkboxes">
          <Checkbox />
        </div>
      </div>
    </>
  );
};

export default Register;
