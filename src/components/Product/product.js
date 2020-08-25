import React from "react";
import { Link } from "react-router-dom";
import "./product.css";

const Product = (props) => {
  const removeFromCart = () => {
    props.onRemoveCart(props.id);
  };

  const addOneProduct = () => {
    props.onAdd(props.id);
  };

  const removeOneProduct = () => {
    props.onRemove(props.id);
  };

  return (
    <div className="product">
      <Link to={"/products/" + props.id}>
        <img
          src={`http://localhost:8000/${props.image}`}
          alt="loading..."
        ></img>
      </Link>
      <h3>{props.title}</h3>
      <div>price {props.price} ils</div>
      {props.isCartProduct ? (
        <div>
          <div className="quantity">quantity: {props.quantity}</div>
          <button onClick={removeFromCart}>Remove from Cart</button>
        </div>
      ) : (
        <div>
          <div className="quantity">quantity: {props.quantity}</div>
          <button onClick={addOneProduct}>+</button>
          <button onClick={removeOneProduct}>-</button>
        </div>
      )}
    </div>
  );
};

export default Product;
