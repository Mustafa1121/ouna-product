import React, { useState } from "react";
import "../form.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../../components/HomeComponent/Header/Header";
import Footer from "../../../components/HomeComponent/Footer/Footer";
import axios from "../../../axios/axios";
import { toast } from "react-toastify";

function ResetPassword({ match }) {
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const token = match.params.token;
  console.log(token);
  const resetPassword = async (e) => {
    e.preventDefault();
    axios
      .post(`/api/user/auth/reset-password/${token}`, {
        password,
        passwordConfirm,
      })
      .then(() => {
        toast.success("Password Changed!");
      })
      .catch((error) => {
        toast.error("Failed to change password.");
      });
  };

  return (
    <>
      <Header />
      <form onSubmit={resetPassword}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btnF ">
            Confirm Password
          </button>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default ResetPassword;
