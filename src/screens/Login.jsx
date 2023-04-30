import React, { useEffect } from "react";
import loginImg from "../assets/login.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../Redux/Actions/userActions";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import axios from "../axios/axios";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: 3,
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

toast.configure({
  position: "bottom-right",
  autoClose: 3000, // Close the toast after 3 seconds
});

const Login = ({ containerRef }) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [flag, setFlag] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("please enter a valid email")
        .required("Email is Required"),
      password: Yup.string()
        .max(15, "must be 10 characters or less.")
        .min(5, "password must be at least 8 characters!")
        .required("Password is Required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values.email, values.password));
    },
    validateOnChange: false, // disable validation on change
  });
  const onSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    setFlag(!flag);
  };

  const sendEmail = () => {
    axios
      .post("/api/user/forgot", { email })
      .then(() => {
        toast.success("Email sent successfully!");
      })
      .catch((error) => {
        toast.error("Failed to send email.");
      });
      setEmail('')
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
    if (formik.errors.email) {
      toast.error(formik.errors.email);
    }
    if (formik.errors.password) {
      toast.error(formik.errors.password);
    }
    formik.setErrors({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, formik.errors, userInfo, history]);

  return (
    <form onSubmit={onSubmit}>
      <div className="base-containerF" ref={containerRef}>
        <div className="headerF">Login</div>
        <div className="contentF">
          <div className="imageF">
            <img src={loginImg} alt="Login" />
          </div>
          <div className="formF">
            <div className="form-groupF">
              <label htmlFor="email" style={{ fontSize: "15px" }}>
                {" "}
                <b>Email</b>{" "}
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <div className="form-groupF">
              <label htmlFor="password" style={{ fontSize: "15px" }}>
                {" "}
                <b>Password</b>{" "}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <Link to="/register">
                {/*  eslint-disable-next-line */}
                <Link className="noacc">
                  Don't have an account? <span>Register here</span>
                </Link>
              </Link>
              <div className="forget">
                <p
                  style={{
                    fontSize: "14px",
                    marginTop: "-2.5px",
                  }}
                  onClick={handleOpen}
                >
                  Forgot password
                </p>
              </div>
            </div>
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                    align="center"
                  >
                    <b>Forgot Password</b>{" "}
                  </Typography>
                  <br />
                  <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, border: "none" }}
                  >
                    <div className="form-groupF">
                      <label
                        htmlFor="email"
                        style={{
                          fontSize: "16px",
                          marginBottom: "10px",
                          marginLeft: "3px",
                        }}
                      >
                        <p style={{ fontWeight: "500" }}>Enter your email</p>
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        style={{ width: "330px" }}
                      />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "0px",
                      }}
                    >
                      <button
                        type="submit"
                        className="btnF"
                        onClick={() => {
                          sendEmail();
                          setOpen(!open);
                        }}
                        style={{ height: "40px", borderRadius: "12px" }}
                      >
                        send link
                      </button>
                    </div>
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
        </div>
        <div className="footerF">
          <button type="submit" className="btnF">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
