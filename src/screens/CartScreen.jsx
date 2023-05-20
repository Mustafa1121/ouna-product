import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios/axios";
import {
  getListCart,
  removefromcart,
  clearCart,
} from "../Redux/Actions/cartActions";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import { UPDATE_CARTITEMS } from "../Redux/Constants/CartConstants";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [loading, setLoading] = useState(false);

  console.log(cartItems);

  const total = cartItems.reduce((a, i) => a + i.price, 0).toFixed(2);

  console.log(cartItems);
  useEffect(() => {
    dispatch(getListCart(userInfo));
    // dispatch(addToCart(productId, qty,userInfo));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, productId, qty]);

  const checkOutHandler = async () => {
    history.push("/shipping");
  };

  const clearCartHandler = () => {
    dispatch(clearCart(userInfo));
  };

  const removeFromCartHandle = (id) => {
    dispatch(removefromcart(id, userInfo));
  };
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Your cart is empty
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "12px",
                backgroundColor: "#3498db",
                border: "none",
              }}
            >
              SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Total Cart Products
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems?.map((item, i) => (
              <div className="carttt" key={i}>
                <div className="cart-iterm row">
                  <div
                    onClick={() => removeFromCartHandle(item._id)}
                    className="remove-button"
                  >
                    <ClearIcon
                      sx={{
                        transition: ".1.5s ease-in-out",
                        fontSize: 35,
                        "&:hover": { color: "red" },
                      }}
                    />
                  </div>
                  <div className="cart-image  col-md-4">
                    <img src={item?.images[0].url} alt={item?.name} />
                  </div>
                  <div className="cart-text col-md-8 d-flex">
                    <Link to={`/products/${item._id}`}>
                      <h6 className="mb-3">
                        <strong>Name:</strong> {item?.name}
                      </h6>
                      <h6 className="mb-3">
                        <strong>Classification:</strong> Pepper Produce
                      </h6>
                      <h6 className="mb-3">
                        <strong>Price:</strong> ${item.price}
                      </h6>
                      <h6 className="mb-3">
                        <strong>Description:</strong> {item.description}
                      </h6>
                    </Link>
                  </div>

                  {/* <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                  <h6>QUANTITY</h6>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div> */}
                  {/* <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                  <h6>PRICE</h6>
                  <h4>${item.price}</h4>
                </div> */}
                </div>
              </div>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <div className="clearButton">
                <DeleteIcon
                  style={{ fontSize: 40, color: "red", cursor: "pointer" }}
                  title="Clear Cart"
                  onClick={clearCartHandler}
                />
              </div>
              <div>
                <span className="sub">total:</span>
                <span className="total-price">${total}</span>
              </div>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>Continue To Shopping</button>
              </Link>
              {total > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={checkOutHandler}>
                    {loading ? (
                      <CircularProgress size={20} style={{ color: "white" }} />
                    ) : (
                      "Purchase"
                    )}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
