import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./product.css";

const Product = (props) => {
  const [productQuantity, setProductQuantity] = useState(props.quantity);

  return (
    <div className="product">
      <h2>{props.title}</h2>
      <img src={props.image}></img>
      <div className="quantity">quantity: {productQuantity}</div>
      <button
        onClick={() => {
          if (productQuantity > 0) {
            setProductQuantity(productQuantity - 1);
            //this.state.updateCart();
          } else alert("product is out of stock");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;
