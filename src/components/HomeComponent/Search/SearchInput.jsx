import React, { useState, useEffect } from "react";
import "./searchInput.css";

const NewSearchSection = ({ handleFilterProducts }) => {
  const [search, setSearch] = useState("");
  const [isRecycle, setIsRecycle] = useState(false);
  const [isNotRecycle, setIsNotRecycle] = useState(false);

  useEffect(() => {
    handleFilterProducts(search, isRecycle, isNotRecycle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, isRecycle, isNotRecycle]);

  return (
    <>
      <div id="search-container">
        <input
          type="search"
          id="search-input"
          placeholder="Search product name here.."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button id="search">Search</button>
      </div>
      <div className="containRdio">
        <div className="radioButtons">
          <input
            onChange={() => {
              setIsRecycle(false);
              setIsNotRecycle(false);
            }}
            type="radio"
            id="radioButtonAll"
            name="radioGroup"
          />
          <label htmlFor="radioButtonAll">All</label>
          <input
            onChange={() => {
              setIsRecycle(true);
              setIsNotRecycle(false);
            }}
            type="radio"
            id="radioButtonRecycled"
            name="radioGroup"
          />
          <label htmlFor="radioButtonRecycled">Recycled</label>
        </div>
        <input
          onChange={() => {
            setIsNotRecycle(true);
            setIsRecycle(false);
          }}
          type="radio"
          id="radioButtonNotRecycled"
          name="radioGroup"
        />
        <label htmlFor="radioButtonNotRecycled" className="nonRecycledLabel">
          Non Recycled
        </label>
      </div>
      <div id="products"></div>
    </>
  );
};

export default NewSearchSection;
