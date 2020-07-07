import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/header";
import Product from "./components/Product/product";
import Counter from "./components/Counter/counter";

class App extends Component {
  state = { color1: "red", color2: "pink" };

  flipColors = () => {
    //this.setState((state) => ({color1:state.color2, color2:state.color1}));
    this.setState({ color1: this.state.color2, color2: this.state.color1 });
  };

  render() {
    return (
      <div className="App">
        <Header />{" "}
        <Product
          image="https://www.ginaplus.co.il/images/itempics/100106_large.jpg"
          title="ladder 1"
          quantity={20}
        />
        <Product
          image="https://elitaieb.co.il/wp-content/uploads/2020/01/KR-0225-scaled.jpg"
          title="ladder 2"
          quantity={3}
        />
        <Product
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZNvmx6zAFlzuvLSIOLXwvo6B_oo1xEhXLmQ&usqp=CAU"
          title="ladder 3"
          quantity={10}
        />
        <Product
          image="https://konimboimages.s3.amazonaws.com/system/photos/2654583/large/11a6f408fe8143ecb6dc7819980a6ea5.jpg"
          title="ladder 4"
          quantity={30}
        />
        <Product
          image="https://www.intex-pool.co.il/images/itempics/316-3_18032019152431_large.jpg"
          title="ladder 5"
          quantity={5}
        />
        <Product
          image="https://d3m9l0v76dty0.cloudfront.net/system/photos/4696013/large/4c8e6bd6e366ad91dfd1178eec7dd7ea.jpg"
          title="ladder 6"
          quantity={10}
        />
      </div>
    );
  }
}

export default App;
