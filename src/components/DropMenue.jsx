import axios from "../axios/axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CATEGORIES_FAIL,
  CATEGORIES_SUCCESS,
  PRODUCT_LIST_SUCCESS,
} from "../Redux/Constants/ProductConstants";

function DropMenue(props) {
  const dispatch = useDispatch();

  const getSpecificProduct = async (id) => {
    try {
      const specificProduct = await axios.get(`api/home/category/${id}`);
      console.log(specificProduct.data.data);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: specificProduct.data.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CATEGORIES_FAIL,
        payload: error.response.data.message,
      });
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
