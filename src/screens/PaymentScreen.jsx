import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../Redux/Actions/cartActions";
import Header from "./../components/Header";
import MuiPhoneNumber from "mui-phone-number";
import { makeStyles } from "@material-ui/core/styles";
const PaymentScreen = ({ history }) => {


  window.scrollTo(0, 0);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const paymentMethod = useState("Cash On delivery");

  const dispatch = useDispatch();
  // function handleOnChange(value) {
  //   this.setState({
  //     phone: value,
  //   });
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  
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
 

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <div className="payment-container">
            <h6>Pick your Date and Time For Delivery</h6>
            <div className="date-container">
              <label htmlFor="date">Day&Month :</label>
              <input
                type="date"
                id="email"
                name="dateInput"
                min="2023-01-01"
                max="2023-12-31"
                required
              />
            </div>
            <div className="date-container">
              <label htmlFor="time"> Time : </label>
              <input type="time" id="email" name="TimeInput" required />
            </div>
            <div className="phone-container">
              <label htmlFor="phone"> Phone Number : </label>
              <MuiPhoneNumber
                defaultCountry={"us"}
                // onChange={}
                autoFormat={true}
                className={classes.root}
                sx={{
                  "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:before": {
                    content: "none",
                  },  
                }}
                required
              />
            </div>
          </div>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
