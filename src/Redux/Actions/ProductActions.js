import { toast } from "react-toastify";
import axios from "../../axios/axios";
import {
  CATEGORIES_FAIL,
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
} from "../Constants/ProductConstants";
import { logout } from "./userActions";

// PRODUCT LIST
export const listProduct = (selectedFlag) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/products/all/${selectedFlag ? selectedFlag : ""}`
    );
    console.log(data);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// SINGLE PRODUCT
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.item });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ADD Product
export const addProduct = (formData, userInfo, history) => async (dispatch) => {
  dispatch({ type: PRODUCT_CREATE_SUCCESS });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      "/api/products/addProduct",
      formData,
      config
    );
    dispatch({ type: PRODUCT_CREATE_FAIL });
    toast.success(data.message);
    history.push("/");

    // const analysisData = await axios.post(
    //   "/api/user/analyze",
    //   {
    //     arrayImages: formData.imagesbase,
    //     itemId: data.data.data._id,
    //   },
    //   config
    // );
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({ type: PRODUCT_CREATE_FAIL });
  }
};

// PRODUCT REVIEW CREATE
export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/products/${productId}/review`, review, config);
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message,
      });
    }
  };

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORIES_REQUEST,
    });
    const { data } = await axios.get("/api/category");
    data.unshift({
      name: "All",
      imageUrl:
        "https://res.cloudinary.com/dxcqzmkxg/image/upload/v1684871203/All_kljrny.jpg",
      _id: 12,
    });
    dispatch({
      type: CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_FAIL,
      payload: error.response.data.message,
    });
  }
};
