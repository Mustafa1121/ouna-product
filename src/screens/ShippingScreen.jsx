import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { getListCart, saveShippingAddress } from "../Redux/Actions/cartActions";
import { getUserAddresses } from "../Redux/Actions/userActions";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import axios from "../axios/axios";
import { toast } from "react-toastify";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const [selectedId, setSelectedId] = useState("");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartItemIds = cartItems.map((item) => item._id);
  // console.log(cartItemIds);
  const total = cartItems
    .reduce((a, i) => a + i.quantity * i.price, 0)
    .toFixed(2);
  // console.log(total);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { addresses } = useSelector((state) => state.listOfAddresses);
  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    setSelectedId(event.target.value);
  };

  useEffect(() => {
    dispatch(getUserAddresses(userInfo));
    dispatch(getListCart(userInfo));
  }, [dispatch, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        token: `${userInfo.data.token}`,
      },
    };
    const formData = {
      totalPrice: total,
      itemsId: cartItemIds,
      addressId: selectedId,
      cartId: cart.cartId,
    };
    console.log(formData)
    try {
      const { data } = await axios.post("/api/home/checkout", formData, config);
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    // dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6 className="mb-5">DELIVERY ADDRESS</h6>
          {/* <input
            type="text"
            placeholder="Enter address"
            id="email"
            required
            value={total}
            readOnly
          />
          <input type="text" placeholder="Enter city" required id="email" />
          <input
            type="text"
            placeholder="Enter postal code"
            required
            id="email"
          />
          <input type="text" placeholder="Enter country" required id="email" /> */}
          {/* <select
            class="form-select mb-5"
            size="3"
            aria-label="size 3 select example"
            onChange={(event) => {
              // handle the select change here
            }}
          >
            {cartItems.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select> */}

          <FormControl style={{ minWidth: "100%", marginBottom: "50px" }}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Purchased Items
            </InputLabel>
            <Select
              multiple
              native
              label="Native"
              inputProps={{
                id: "select-multiple-native",
              }}
              style={{ width: "100%", minWidth: "100%" }}
            >
              {cartItems.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ minWidth: "100%" }}>
            <Select
              value={selectedId}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ width: "100%", minWidth: "100%" }}
              onChange={handleSelectChange}
            >
              <MenuItem value="" disabled>
                <em>None</em>
              </MenuItem>
              {addresses?.map((address) => (
                <MenuItem key={address._id} value={address._id}>
                  {address.city}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Choose an address</FormHelperText>
          </FormControl>
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
