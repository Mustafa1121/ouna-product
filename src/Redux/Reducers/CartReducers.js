import { toast } from "react-toastify";
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  GET_CART_LIST,
  CART_ADD_LOADING,
  UPDATE_CARTITEMS,
  CART_ADD_FAIL,
} from "../Constants/CartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_LOADING:
      return { ...state, loading: true };
    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: action.payload,
        loading: false,
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_ADD_FAIL:
      return {
        ...state,
        loading: false,
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case GET_CART_LIST:
      return {
        ...state,
        cartItems: action.payload.itemsArray,
        cartId: action.payload.cartId,
      };
    case UPDATE_CARTITEMS:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};
