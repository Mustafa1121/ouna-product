import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-slick";
import "./category.css";
import { useSelector } from "react-redux";
import { PRODUCT_LIST_SUCCESS } from "../../../Redux/Constants/ProductConstants";
import { CATEGORIES_FAIL } from "../../../Redux/Constants/ProductConstants";
import { listProduct } from "../../../Redux/Actions/ProductActions";
import axios from "../../../axios/axios";
import { toast } from "react-toastify";
const FilterSection = () => {
  const categories = useSelector((state) => state.productCategories);
  const dispatch = useDispatch();

  const origin = localStorage.getItem("selectedFlag");

  const getSpecificProduct = async (id) => {
    if (id === 12) {
      dispatch(listProduct(localStorage.getItem("selectedFlag")));
      return;
    }
    try {
      const specificProduct = await axios.get(
        `/api/products/category/${id}/${origin}`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: specificProduct.data.products,
      });
    } catch (error) {
      dispatch({
        type: CATEGORIES_FAIL,
        payload: error.response.data.message,
      });
      toast.error(error.response.data.message);
    }
  };

  const [settings] = useState({
    dots: true,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  });

  return (
    <div className="dummyContainer">
      <Slider {...settings}>
        {categories?.categories?.map((category, index) => (
          <div
            key={index}
            onClick={() => getSpecificProduct(category._id)}
            className="dummy"
          >
            <img src={category.imageUrl} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FilterSection;
