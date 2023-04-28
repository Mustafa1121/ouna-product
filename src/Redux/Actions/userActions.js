import {
  GET_LIST_OF_ADDRESSES_REQUEST,
  GET_LIST_OF_ADDRESSES_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../Constants/UserContants";
import axios from "../../axios/axios";
import { ORDER_LIST_MY_RESET } from "../Constants/OrderConstants";
import { toast } from "react-toastify";


toast.configure({
  position: "bottom-right",
  autoClose: 3000, // Close the toast after 3 seconds
});

// LOGIN
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/api/user/login`,
      { email, password },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    toast.info("Login successfully");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error(error.response.data.message);
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  toast.info("Logout successfully");
};

// REGISTER
export const register = (user, history) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = await axios.post(`/api/user/save`, user, config);
    if (data.data.message === "User already exists") {
      toast.error("User already exists");
      return;
    }
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data.data });
    history.push("/login");
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message && error.message ? error.message : error.message,
    });
    toast.error(error.response.data.message);
  }
};

// USER DETAILS
export const getUserDetails = (id, userInfo) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const config = {
      headers: {
        token: `${userInfo.data.token}`,
      },
    };
    console.log(config);
    const { data } = await axios.get(`/api/user/me`, config);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// UPDATE PROFILE
export const updateUserProfile =
  (user, userInfo) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
      const config = {
        headers: {
          token: `${userInfo.data.token}`,
        },
      };
      const { data } = await axios.post(`/api/user/changepass`, user, config);
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
      toast.info("Your profile is updated");
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      });
      toast.error(error.response.data.message);
    }
  };

export const getUserAddresses = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_OF_ADDRESSES_REQUEST });
    const config = {
      headers: {
        token: `${userInfo.data.token}`,
      },
    };
    const { data } = await axios.get("/api/user/listAddresses", config);
    dispatch({
      type: GET_LIST_OF_ADDRESSES_SUCCESS,
      payload: data.data.addresses,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
    toast.error(error.response.data.message);
  }
};
