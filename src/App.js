import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/header";
import Product from "./components/Product/product";
import axios from "axios";
import "./components/Cart/cart.css";
import { Slider } from "antd";

//import Cart from "./components/Cart/cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);
  const [priceRange, setPriceRange] = useState([]);
  const [priceRangeSelected, setPriceRangeSelected] = useState([]);

  const handleRangeChange = ([minVal, maxVal]) => {
    //console.log(minVal, maxVal);
    //console.log(products.filter((p) => p.price >= minVal && p.price <= maxVal));
    setPriceRangeSelected([minVal, maxVal]);
  };

  useEffect(() => {
    axios.get("https://quilt-flax-chemistry.glitch.me/products").then((res) => {
      setProducts(res.data);

      let min = res.data.reduce(function (prev, current) {
        return prev.price < current.price ? prev : current;
      }).price;

      let max = res.data.reduce(function (prev, current) {
        return prev.price > current.price ? prev : current;
      }).price;
      setPriceRange([min, max]);
      setPriceRangeSelected([min, max]);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="Cart">
        <h2>Cart (total items {totalProductsInCart})</h2>
        {cart.map((p, index) => (
          <Product
            key={p.id}
            id={p.id}
            title={p.title}
            image={p.image}
            cartQuantity={p.cartQuantity}
            quantity={p.quantity}
            price={p.price}
            isCartProduct={true}
            onRemoveCart={() => {
              const prodInd = products.findIndex((pr) => pr.id === p.id);
              const updatedProducts = JSON.parse(JSON.stringify(products));
              let updProd = updatedProducts[prodInd];
              updProd.quantity += p.cartQuantity;
              updatedProducts[prodInd] = updProd;
              setProducts(updatedProducts);

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
        price filter
        {priceRange[0] ? (
          <Slider
            range
            min={priceRange[0]}
            max={priceRange[1]}
            defaultValue={priceRange}
            //value={[20, 50]}
            // value={[min, max]}
            step={5}
            onChange={handleRangeChange}
            tooltipVisible
          ></Slider>
        ) : null}
        {products
          .filter(function (pr) {
            return (
              pr.price >= priceRangeSelected[0] &&
              pr.price <= priceRangeSelected[1]
            );
          })
          .map((p, index) => (
            <Product
              key={p.id}
              id={p.id}
              title={p.title}
              image={p.image}
              cartQuantity={p.cartQuantity}
              quantity={p.quantity}
              price={p.price}
              isCartProduct={false}
              onAdd={(pId) => {
                console.log(p.id);
                setTotalProductsInCart(totalProductsInCart + 1);

                const prodInd = products.findIndex((pr) => pr.id === pId);
                const updatedProducts = JSON.parse(JSON.stringify(products));
                let updProd = updatedProducts[prodInd];
                updProd.quantity -= 1;
                updatedProducts[prodInd] = updProd;
                setProducts(updatedProducts);

                const ind = cart.findIndex((pr) => pr.id === pId);

                if (ind === -1) {
                  let productToAdd = products.find((pr) => pr.id === pId);
                  productToAdd.cartQuantity = 1;
                  setCart([...cart, productToAdd]);
                } else {
                  const updatedCart = JSON.parse(JSON.stringify(cart));
                  let newProd = { ...updatedCart[ind] };
                  newProd.cartQuantity += 1;
                  updatedCart[ind] = newProd;
                  console.log("updatedCart", updatedCart);
                  setCart(updatedCart);
                  console.log("cart = ", cart);
                }
              }}
              onRemove={(pId) => {
                const prodInd = products.findIndex((pr) => pr.id === pId);
                const updatedProducts = JSON.parse(JSON.stringify(products));
                let updProd = updatedProducts[prodInd];
                updProd.quantity += 1;
                updatedProducts[prodInd] = updProd;
                setProducts(updatedProducts);

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
