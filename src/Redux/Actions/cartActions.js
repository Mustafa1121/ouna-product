import axios from "../../axios/axios";
import {
  CART_ADD_ITEM,
  CART_ADD_LOADING,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  GET_CART_LIST,
  CART_CLEAR_ITEMS,
} from "../Constants/CartConstants";
import { toast } from "react-toastify";

toast.configure({
  position: "bottom-right",
  autoClose: 3000, // Close the toast after 3 seconds
});

export const getListCart = (userInfo) => async (dispatch) => {
  try {
    const config = {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`api/cart/items`, config);
    console.log(data.items);
    dispatch({
      type: GET_CART_LIST,
      payload: {
        itemsArray: data.items.map((i) => ({
          ...i.item,
          _id: i._id,
        })),
        cartId: data.id,
      },
    });
  } catch (error) {
    // console.log(error)
    // toast.error(error.response.data)
  }
};

// // ADD TO CART
export const addToCart =
  (id, userInfo, product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CART_ADD_LOADING,
      });
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/cart/${id}`,
        {
          quantity: 1,
        },
        config
      );
      console.log(data);
      dispatch({
        type: CART_ADD_ITEM,
        payload: product,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

// REMOVE PRODUCT FROM CART
export const removefromcart = (id, userInfo) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        token: `${userInfo.data.token}`,
      },
    };
    await axios.delete(`api/home/cart/deleteItemFromCart/${id}`, config);
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    toast.warning("Item removed");
  } catch (error) {
    toast.error(error.response.data.message);
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//clear Cart
// REMOVE PRODUCT FROM CART
export const clearCart = (userInfo) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        token: `${userInfo.data.token}`,
      },
    };
    await axios.delete(`api/home/cart/clearCartItems`, config);
    dispatch({
      type: CART_CLEAR_ITEMS,
    });
    toast.info("Items deleted.", {
      position: "bottom-right",
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
