import React, { useState } from "react";
import "./SearchProduct.css";

const SearchProduct = (props) => {
  const handleSearch = (e) => {
    props.searchForProduct(e.target.value);
  };

  return (
    <span className="searchProduct">
      <input type="text" placeholder="Search" onChange={handleSearch}></input>
    </span>
  );
};

export default SearchProduct;
