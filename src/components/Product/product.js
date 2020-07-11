import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./product.css";

class Product extends Component {
  state = {
    productImg: this.props.image,
    productTitle: this.props.title,
    productQuantity: this.props.quantity,
    updateCart: this.props.updateCart,
  };
  render() {
    return (
      <div className="product">
        <h2>{this.state.productTitle}</h2>
        <img src={this.state.productImg}></img>
        <div className="quantity">quantity: {this.state.productQuantity}</div>
        <button
          onClick={() => {
            if (this.state.productQuantity > 0) {
              this.setState({
                productQuantity: this.state.productQuantity - 1,
              });
              this.state.updateCart();
            } else alert("product is out of stock");
          }}
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

export default Product;
