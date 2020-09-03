import React, { useState, useEffect } from "react";
import Product from "../Product/product";
import "../Products/products.css";
import { Slider } from "antd";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [priceRangeSelected, setPriceRangeSelected] = useState([]);

  const handleRangeChange = ([minVal, maxVal]) => {
    setPriceRangeSelected([minVal, maxVal]);
  };

  const handleOnAddProduct = (pId) => {
    props.addProductToCart(pId);
  };

  const handleOnRemoveProduct = (pId) => {
    props.removeProductFromCart(pId);
  };

  useEffect(() => {
    setProducts(props.products);
    let min = Math.min(...props.products.map((o) => o.price));
    let max = Math.max(...props.products.map((o) => o.price));
    setPriceRange([min, max]);
    setPriceRangeSelected([min, max]);
  }, []);

  useEffect(() => {
    setProducts(props.products);
  }, [props]);

  return (
    <div className="ShopContainer">
      price filter
      {priceRange[0] ? (
        <Slider
          range
          min={priceRange[0]}
          max={priceRange[1]}
          defaultValue={priceRange}
          step={1}
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
            cartQuantity={p.cartQuantity} // ? p.cartQuantity : 0}
            quantity={p.quantity}
            price={p.price}
            isCartProduct={false}
            onAdd={handleOnAddProduct}
            onRemove={handleOnRemoveProduct}
          />
        ))}
      {/* </div> */}
    </div>
  );
};

export default Products;
