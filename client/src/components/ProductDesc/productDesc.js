import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./productDesc.css";

import axios from "axios";
const ProductDesc = (props) => {
  const [productData, setProductData] = useState([]);
  const { idParam } = useParams();
  useEffect(() => {
    axios.get(`/api/products/${idParam}`).then((res) => {
      setProductData(res.data);
    });
  }, [idParam]);
  return (
    <div className="productData">
      <Link to={"/"}>Home</Link>
      <div className="productTitle">{productData.title}</div>
      <img src={productData.image} alt="loading..." />
      <div className="productQuantity">Quantity:{productData.quantity}</div>
      <h1>description:</h1>
      <p>{productData.description}</p>
    </div>
  );
};

export default ProductDesc;
