import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../../components/HomeComponent/Header/Header";
import Message from "../../components/LoadingError/Error.jsx";
import axios from "../../axios/axios";
import { toast } from "react-toastify";
import { CART_CLEAR_ITEMS } from "../../Redux/Constants/CartConstants";
import { CircularProgress } from "@material-ui/core";
import { getListCart } from "../../Redux/Actions/cartActions";
import { saveShippingAddress } from "../../Redux/Actions/cartActions";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cartItemIds = cartItems.map((item) => item.id);
  const [loading, setLoading] = useState(false);

  console.log(cartItems);
  const placeOrderHandler = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const formData = {
      country: localStorage.getItem("selectedFlag"),
      itemsId: cartItemIds,
      addressId: cart.shippingAddress.selectedAddress._id,
      cartId: cart.cartId,
      preferredTime: cart.shippingAddress.date,
    };
    try {
      setLoading(true);
      await axios.post("/api/order", formData, config);
      await axios.delete(`/api/cart`, config);
      dispatch({
        type: CART_CLEAR_ITEMS,
      });
      setLoading(false);
      toast.success("Order Placed !");
      localStorage.removeItem("shippingAddress");
      history.push("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    dispatch(getListCart(userInfo));
    dispatch(
      saveShippingAddress(JSON.parse(localStorage.getItem("shippingAddress")))
    );
  }, [dispatch, userInfo]);

  const total = cartItems.reduce((a, i) => a + i.price, 0).toFixed(2);

  console.log(cart);

  return (
    <>
      <Header />
      <div className="placeOrderContainer">
        <div className="m-auto" style={{ width: "90%" }}>
          <div className="row  order-detail">
            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
              <div className="row ">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Customer</strong>
                  </h5>
                  <p>
                    <span style={{ fontWeight: "600" }}>Name:</span>{" "}
                    {userInfo?.data?.user?.Fname}
                  </p>
                  <p>
                    <span style={{ fontWeight: "600" }}>Email:</span>{" "}
                    {userInfo?.data?.user?.email}
                  </p>
                </div>
              </div>
            </div>
            {/* 2 */}
            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
              <div className="row">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i className="fas fa-truck-moving"></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Order info</strong>
                  </h5>
                  <p>
                    <span style={{ fontWeight: "600" }}>Shipping:</span>{" "}
                    {localStorage.getItem("selectedFlag") === "Lebanon"
                      ? "Lebanon"
                      : "Egypt"}
                  </p>
                  <p>
                    <span style={{ fontWeight: "600" }}>Pay method:</span> Cash
                    On Delivery
                  </p>
                </div>
              </div>
            </div>
            {/* 3 */}
            <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
              <div className="row">
                <div className="col-md-4 center">
                  <div className="alert-success order-box">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                </div>
                <div className="col-md-8 center">
                  <h5>
                    <strong>Deliver to</strong>
                  </h5>
                  <p>
                    <span style={{ fontWeight: "600" }}>Address:</span>{" "}
                    {cart.shippingAddress.selectedAddress.fullAddress}
                  </p>
                  <p>
                    <span style={{ fontWeight: "600" }}>City:</span>{" "}
                    {cart.shippingAddress.selectedAddress.city},{" "}
                  </p>
                  <p>
                    <span style={{ fontWeight: "600" }}>Additional-Info:</span>{" "}
                    {cart.shippingAddress.selectedAddress.additionalAddressInfo}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row order-products justify-content-between">
            <div className="col-lg-8">
              {cart.cartItems.length === 0 ? (
                <Message variant="alert-info mt-5">Your cart is empty</Message>
              ) : (
                <>
                  {cart.cartItems.map((item, index) => (
                    <div className="order-product row" key={index}>
                      <div className="col-sm-3 d-sm-block col-12 d-flex justify-content-center">
                        <img
                          src={item.images[0].url}
                          alt={item.name}
                          style={{ width: "150px", height: "110px" }}
                        />
                      </div>
                      <div className="col-sm-5 align-items-sm-center  col-6 d-flex align-items-start d-flex flex-column justify-content-center">
                        <h4>
                          <b>NAME</b>
                        </h4>
                        <Link to={`/products/${item.id}`}>
                          <h5>{item.name}</h5>
                        </Link>
                      </div>
                      <div className="mt-3 mt-md-0 col-sm-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                        <h4>
                          <b>SUBTOTAL</b>
                        </h4>
                        <h5>${item.price}</h5>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            {/* total */}
            <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <strong>Products</strong>
                    </td>
                    <td>${total}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Tax</strong>
                    </td>
                    <td>${(total * 0.1).toFixed(2)}</td>
                  </tr>
                  {/* <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  <td>${cart.taxPrice}</td>
                </tr> */}
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>${(total * 1.1).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              {cart.cartItems.length === 0 ? null : (
                <button type="submit" onClick={placeOrderHandler}>
                  {loading ? (
                    <CircularProgress size={20} style={{ color: "white" }} />
                  ) : (
                    "Place Order"
                  )}
                </button>
              )}
              {/* {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
