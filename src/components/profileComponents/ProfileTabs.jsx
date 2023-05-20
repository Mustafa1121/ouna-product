import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../LoadingError/Toast.jsx";
import { updateUserProfile } from "../../Redux/Actions/userActions.js";

const ProfileTabs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Oldpassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const { loading: updateLoading } = userUpdateProfile;

  useEffect(() => {
    if (userLogin) {
      setName(userInfo.data.user.Fname);
      setEmail(userInfo.data.user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userLogin]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    dispatch(
      updateUserProfile(
        {
          oldpass: Oldpassword,
          newpass: NewPassword,
        },
        userInfo
      )
    );
  };
  return (
    <>
      <Toast />
      {/* {error && <Message variant="alert-danger">{error}</Message>} */}
      {/* {loading && <Loading />} */}
      {/* {updateLoading && <Loading />} */}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">
              <b>UserName</b>
            </label>
            <input
              className="form-control"
              type="text"
              value={name}
              disabled
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-email">
              <b>E-mail Address</b>
            </label>
            <input
              className="form-control"
              type="email"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">
              <b>Old Password</b>
            </label>
            <input
              className="form-control"
              type="password"
              value={Oldpassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">
              <b>New Password</b>
            </label>
            <input
              className="form-control"
              type="password"
              value={NewPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            className="updateProfileBtn"
            type="submit"
            style={{
              backgroundColor: "#3498db",
              width: "100%",
              borderRadius: "35px",
              border: "none",
              color: "#fff",
              padding: "10px 20px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,.2)",
              fontSize: "16px",
            }}
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default ProfileTabs;
