import React from "react";
import "./cart.css";
import Product from "../Product/product";

const Cart = (props) => {
  const handleRemoveProductFromCart = (pId) => {
    props.removeProductFromCart(pId);
  };

  return (
    <div className="Cart">
      <h2>{props.cart.totalProductsCount} PRODUCTS IN CART</h2>
      {props.cart.products.map((p, index) => (
        <div key={index}>
          <Product
            key={p._id}
            _id={p._id}
            title={p.title}
            image={p.image}
            quantity={p.quantity}
            price={p.price}
            isCartProduct={true}
            onRemoveCart={handleRemoveProductFromCart}
          />
        </div>
      ))}
      <h2>TOTAL {props.cart.totalProductsAmount} ILS</h2>
    </div>
  );
};

export default Cart;
