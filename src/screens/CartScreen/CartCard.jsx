import React from "react";
import "./CartCard.css";
import ClearIcon from "@mui/icons-material/Clear";
const CartCard = ({
  image,
  name,
  classification,
  price,
  description,
  removeProduct,
  id,
}) => {
  return (
    <>
      <div className="product-card">
        <img src={image} alt={name} className="product-image" />
        <div className="product-details">
          <p className="product-name">
            <strong>ProductName : </strong>
            {name}
          </p>
          <p className="product-classification1">
            <strong>Classification : </strong>
            {classification}
          </p>
          <p className="product-price">
            <strong>Price : </strong>${price}
          </p>
          <p className="product-description1">
            <strong>Description : </strong>
            {description}
          </p>
        </div>
        <ClearIcon className="ClearIcon" onClick={() => removeProduct(id)} />
      </div>
    </>
  );
};

export default CartCard;
