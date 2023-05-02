import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MuiPhoneNumber from "mui-phone-number";
import { makeStyles } from "@material-ui/core/styles";
import email from "../images/images/email.gif";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Redux/Actions/userActions";

toast.configure({
  position: "bottom-right",
  autoClose: 3000, // Close the toast after 3 seconds
});

export default function CheckboxLabels() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [hideRegister, sethideRegister] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Full Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is Required"),
      password: Yup.string()
        .max(15, "Password must be 10 characters or less.")
        .min(8, "Password must be at least 8 characters!")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      const registerData = {
        fname: values.firstName,
        lname: values.lastName,
        phoneN: phoneNumber,
        email: values.email,
        password: values.password,
        countryCode: countryCode,
      };
      dispatch(register(registerData, history));
    },
    validateOnChange: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    sethideRegister(!hideRegister);
    setFlag(!flag);
  };

  React.useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
    if (formik.errors.email) {
      toast.error(formik.errors.email);
    }
    if (formik.errors.password) {
      toast.error(formik.errors.password);
    }
    if (formik.errors.firstName) {
      toast.error(formik.errors.firstName);
    }
    if (formik.errors.lastName) {
      toast.error(formik.errors.lastName);
    }
    formik.setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag, formik.errors, userInfo, history]);

  const useStyles = makeStyles({
    root: {
      "& .MuiInputBase-input": {
        width: "228px", // Set the width of the input
        fontSize: "16px",
        padding: "6px 10px",
        border: "1px solid rgba(0, 0, 0, 0.5)", // Add a black border
        borderRadius: "6px",
      },
      "& .MuiButtonBase-root": {
        backgroundColor: "white",
        margin: "0px 0px 0px 0px",
      },

      "& .": {
        content: "none",
      },
    },
  });
  const classes = useStyles();

  const handleOnChange = (value, country) => {
    const countryCode = `+${country.dialCode}`;
    const phoneNumberWithoutCountryCode = value.replace(countryCode, "");
    setPhoneNumber(phoneNumberWithoutCountryCode);
    setCountryCode(country.dialCode);
  };

  const renderInputFields = () => {
    return (
      <>
        <div className="fnameLname">
          <div className="form-groupF">
            <label htmlFor="firstName" style={{ fontSize: "15px" }}>
              {" "}
              <b>First Name</b>
            </label>
            <input
              type="text"
              name="firstName"
              id="email"
              placeholder="First name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </div>
          <div className="form-groupF">
            <label htmlFor="lastName" style={{ fontSize: "15px" }}>
              {" "}
              <b>Last Name</b>
            </label>
            <input
              type="text"
              name="lastName"
              id="email"
              placeholder="Last name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </div>
        </div>
        <br />
        <div className="mustafamo5">
          <div className="form-groupF">
            <label htmlFor="email" style={{ fontSize: "15px" }}>
              {" "}
              <b>Email</b>
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="email@gmail.com"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>

          {/* <div className="form-groupF">
            <label htmlFor="email" style={{ fontSize: "15px" }}>
              {" "}
              <b>Address</b>{" "}
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </div> */}
          {
            <div className="phone-container">
              <label htmlFor="phone" style={{ fontSize: "15px" }}>
                {" "}
                Phone Number :{" "}
              </label>
              <MuiPhoneNumber
                defaultCountry={
                  localStorage.getItem("selectedFlag") === "Lebanon"
                    ? "lb"
                    : "eg"
                }
                onChange={handleOnChange}
                autoFormat={true}
                className={classes.root}
                sx={{
                  "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:before": {
                    content: "none",
                  },
                  ".css-v4u5dn-MuiInputBase-root-MuiInput-root ": {
                    width: "27.4em",
                  },
                  ".css-1x51dt5-MuiInputBase-input-MuiInput-input": {},
                }}
                required
              />
            </div>
          }
          <br />
          <div className="form-groupF">
            <label htmlFor="password" style={{ fontSize: "15px" }}>
              {" "}
              <b>Password</b>{" "}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <Link to="/login">
            {/*  eslint-disable-next-line */}
            <Link to="/login" className="noacc">
              Already have an account? <span>Login here</span>
            </Link>
          </Link>
        </div>
      </>
    );
  };

  return (
    <>
      {!hideRegister ? (
        <form onSubmit={onSubmit}>
          <div className="headerF">Register</div>
          {renderInputFields()}
          <div className="footerF">
            <button type="submit" className="btnF">
              Register
            </button>
          </div>
        </form>
      ) : (
        <div className="emailVer">
          <img
            src={email}
            alt="email verification"
            width="160px"
            height="140px"
          />
          <h2>Verify your email</h2>
          <p>
            Hello {formik.values.businessName}, we have sent you an email, go
            verify your email and start enjoying Ouna.
          </p>
        </div>
      )}
      <></>
    </>
  );
}
