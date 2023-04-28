import React from "react";
import "../style/form.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ResetPassword() {
  return (
    <>
      <Header />
      <div className="base-containerS">
        <div className="contentS">
          <div className="formF">
            <div className="form-groupF">
              <label
                htmlFor="newPass"
                style={{ fontSize: "18px", paddingBottom: "10px" }}
              >
                {" "}
                <b>Password</b>{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="new password"
              />
            </div>
            <div className="form-groupF">
              <label
                htmlFor="password"
                style={{ fontSize: "18px", paddingBottom: "10px" }}
              >
                {" "}
                <b>Confirm Password</b>{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="confirm password"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btnF">
          Confirm Password
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
