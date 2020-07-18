import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/header";
import Product from "./components/Product/product";
import axios from "axios";
import "./components/Cart/cart.css";
//import Cart from "./components/Cart/cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);

  useEffect(() => {
    axios.get("https://quilt-flax-chemistry.glitch.me/products").then((res) => {
      //console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  // useEffect(() => {
  //   console.log("item added to your cart");
  // });

  return (
    <div className="App">
      <Header />
      <div className="Cart">
        <h2>Cart (total items {totalProductsInCart})</h2>
        {cart.map((p, index) => (
          <Product
            key={index}
            id={p.id}
            title={p.title}
            image={p.image}
            cartQuantity={p.cartQuantity}
            quantity={p.quantity}
            isCartProduct={true}
            onRemoveCart={() => {
              setTotalProductsInCart(totalProductsInCart - p.cartQuantity);
              setCart(
                cart.filter((productInCart) => p.id !== productInCart.id)
              );
            }}
          />
        ))}
      </div>
      <div className="Products">
        <h2>Products</h2>
        {products.map((p, index) => (
          <Product
            key={index}
            id={p.id}
            title={p.title}
            image={p.image}
            cartQuantity={p.cartQuantity}
            quantity={p.quantity}
            isCartProduct={false}
            onAdd={(pId) => {
              console.log(p.id);
              setTotalProductsInCart(totalProductsInCart + 1);
              const ind = cart.findIndex((pr) => pr.id === pId);

              if (ind === -1) {
                let productToAdd = products.filter((pr) => pr.id === pId)[0];
                productToAdd.cartQuantity = 1;
                setCart([...cart, productToAdd]);
              } else {
                let updatedCart = [...cart];
                updatedCart[ind].cartQuantity += 1;
                setCart([...updatedCart]);
                console.log("cart = ", cart);
              }
            }}
            onRemove={(pId) => {
              const indCart = cart.findIndex((pr) => pr.id === pId);
              if (totalProductsInCart > 0 && indCart !== -1) {
                setTotalProductsInCart(totalProductsInCart - 1);
                let updatedCart = [...cart];
                updatedCart[indCart].cartQuantity -= 1;
                if (updatedCart[indCart].cartQuantity === 0) {
                  setCart(
                    cart.filter((productInCart) => p.id !== productInCart.id)
                  );
                }
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
