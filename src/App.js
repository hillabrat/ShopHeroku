import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/header";
import Products from "./components/Products/products";
import ProductDesc from "./components/ProductDesc/productDesc";

//import Cart from "./components/Cart/cart";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalProductsInCart, setTotalProductsInCart] = useState(0);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Products />
          </Route>
          <Route path="/products/:idParam">
            <ProductDesc />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
