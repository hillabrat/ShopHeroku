import React, { useState } from "react";
import "./product.css";

const Product = (props) => {
  const [productQuantity, setProductQuantity] = useState(props.quantity);
  const [productCartQuantity, setProductCartQuantity] = useState(
    props.cartQuantity
  );
  //console.log(props);
  const productKey = props.id;
  return (
    <div className="product">
      <h3>
        {props.title} - {props.id}
      </h3>
      <img src={props.image}></img>
      <div>price = {props.price}</div>
      {props.isCartProduct ? (
        <div>
          <div className="quantity">quantity: {props.cartQuantity}</div>
          <button
            title="Remove from Cart"
            onClick={() => {
              setProductQuantity(props.cartQuantity + props.quantity);
              setProductCartQuantity(0);
              props.onRemoveCart();
            }}
          >
            Remove from Cart
          </button>
        </div>
      ) : (
        <div>
          <div className="quantity">quantity: {props.quantity}</div>
          <button
            title="Add to Cart"
            onClick={() => {
              if (productQuantity > 0) {
                setProductQuantity(productQuantity - 1);
                props.onAdd(props.id);
              } else alert("product is out of stock");
            }}
          >
            +
          </button>
          <button
            title="Remove from Cart"
            onClick={() => {
              if (productCartQuantity > 0)
                setProductQuantity(productQuantity + 1);

              props.onRemove(props.id);
            }}
          >
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
