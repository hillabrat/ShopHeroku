import React, { useState } from "react";
import logo from "./logo.svg";
import ladder1 from "./images/ladder1.jpg";
import ladder2 from "./images/ladder2.jpg";
import ladder3 from "./images/ladder3.jpg";
import "./App.css";
import Header from "./components/Header/header";
import Product from "./components/Product/product";

const App = () => (
  // state = {
  //   itemsInCart: 0,
  // };

  // updateCart = () => {
  //   console.log("update Cart!!!");
  //   this.setState({ itemsInCart: this.state.itemsInCart + 1 });
  // };
  <div className="App">
    <Header />
    <div className="Products">
      {/* <div className="Cart">Cart Count = {this.state.itemsInCart}</div> */}
      <Product
        image={ladder1}
        title="ladder 1"
        quantity={20}
        // updateCart={this.updateCart}
      />
      <Product
        image={ladder2}
        title="ladder 2"
        quantity={3}
        // updateCart={this.updateCart}
      />
      <Product
        image={ladder3}
        title="ladder 3"
        quantity={10}
        // updateCart={this.updateCart}
      />
      <Product
        image="https://konimboimages.s3.amazonaws.com/system/photos/2654583/large/11a6f408fe8143ecb6dc7819980a6ea5.jpg"
        title="ladder 4"
        quantity={30}
        // updateCart={this.updateCart}
      />
      <Product
        image="https://www.intex-pool.co.il/images/itempics/316-3_18032019152431_large.jpg"
        title="ladder 5"
        quantity={5}
        // updateCart={this.updateCart}
      />
      <Product
        image="https://d3m9l0v76dty0.cloudfront.net/system/photos/4696013/large/4c8e6bd6e366ad91dfd1178eec7dd7ea.jpg"
        title="ladder 6"
        quantity={10}
        // updateCart={this.updateCart}
      />
    </div>
  </div>
);

export default App;
