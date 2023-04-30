import axios from "../axios/axios";
import React from "react";
import { useDispatch } from "react-redux";
import {
  CATEGORIES_FAIL,
  PRODUCT_LIST_SUCCESS,
} from "../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";

function DropMenue(props) {
  const dispatch = useDispatch();

  const getSpecificProduct = async (id) => {
    try {
      const specificProduct = await axios.get(`api/home/category/${id}`);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: specificProduct.data.data,
      });
    } catch (error) {
      dispatch({
        type: CATEGORIES_FAIL,
        payload: error.response.data.message,
      });
      toast.error( error.response.data.message)
    }
  };

  return (
    <div className="dropdown">
      <label className="dropbtn">{props.name}</label>
      <div className="dropdown-content">
        {props.item?.map((item,i) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <p
            onClick={() => getSpecificProduct(item.id)}
            key={i}
          >
            {item.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default DropMenue;
