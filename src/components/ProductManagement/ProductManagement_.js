import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProductManagement.css";
import ProductForm from "./ProductForm/ProductForm";
import axios from "axios";
//import { Collapse } from "antd";
import { Menu, Button } from "antd";

//const { Panel } = Collapse;
const { SubMenu } = Menu;

const ProductManagement = (props) => {
  const [products, setProducts] = useState([]);
  const [productKey, setProductKey] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:8000/products/").then((res) => {
      setProducts(res.data);
    });
  }, []);

  //   const callback = (key) => {
  //     console.log(key);
  //   };

  return (
    <div className="productsMgmt">
      <div className="productsList">
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
        >
          {products.map((p, index) => (
            <Menu.Item
              key={p.id}
              onClick={(e) => {
                setProductKey(e.key);
              }}
            >
              {p.title}
            </Menu.Item>
          ))}
          ;
        </Menu>
      </div>
      {<ProductForm product={products.find((p) => p.id === +productKey)} />}
    </div>
  );
};

export default ProductManagement;
