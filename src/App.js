import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import ladder1 from "./images/ladder1.jpg";
import ladder2 from "./images/ladder2.jpg";
import ladder3 from "./images/ladder3.jpg";
import "./App.css";
import Header from "./components/Header/header";
import Product from "./components/Product/product";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://quilt-flax-chemistry.glitch.me/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="Products">
        {products.map((p) => (
          <Product
            key={p.id}
            title={p.title}
            image={p.image}
            quantity={p.quantity}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
