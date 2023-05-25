import React, { useEffect, useState } from "react";
import Header from "../../components/HomeComponent/Header/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getListCart,
  removefromcart,
  clearCart,
} from "../../Redux/Actions/cartActions";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress } from "@material-ui/core";
import CartCard from "./CartCard";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [loading] = useState(false);

  const total = cartItems.reduce((a, i) => a + i.price, 0).toFixed(2);

  console.log(cartItems.length);
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

      <div className="container ">
        {cartItems.length === 0 ? (
          <div className="emptyCart  alert alert-info text-center ">
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
            <div className="cart-container">
              {cartItems
                ?.slice()
                .reverse()
                .map((item, i) => (
                  <CartCard
                    key={i}
                    image={
                      item && item.images && item.images.length > 0
                        ? item.images[0].url
                        : ""
                    }
                    name={item?.name}
                    price={item.price}
                    description={item.description}
                    id={item._id}
                    classification={"Pepper Produce"}
                    removeProduct={removeFromCartHandle}
                  />
                ))}
            </div>

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
