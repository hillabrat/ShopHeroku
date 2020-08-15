import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import Cart from "./components/Cart/cart";
import Products from "./components/Products/products";
import ProductDesc from "./components/ProductDesc/productDesc";
import ProductManagement from "./components/ProductManagement/ProductManagement";
import Login from "./components/Login/Login";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({
    products: [],
    totalProductsCount: 0,
    totalProductsAmount: 0,
  });

  const handleAddOneProduct = (pId) => {
    const prodInd = products.findIndex((p) => p.id === pId);
    let updatedProducts = JSON.parse(JSON.stringify(products));
    if (updatedProducts[prodInd].quantity > 0) {
      updatedProducts[prodInd].quantity -= 1;
      updatedProducts[prodInd].cartQuantity += 1;
      setProducts(updatedProducts);
    } else {
      alert("product is out of stock");
    }

    const cartInd = cart.products.findIndex((p) => p.id === pId);
    if (cartInd === -1) {
      let productToAdd = products[prodInd];
      productToAdd.quantity = 1;

      setCart({
        products: [...cart.products, productToAdd],
        totalProductsCount: cart.totalProductsCount + 1,
        totalProductsAmount: cart.totalProductsAmount + productToAdd.price,
      });
    } else {
      let updatedCartProducts = JSON.parse(JSON.stringify(cart.products));
      updatedCartProducts[cartInd].quantity += 1;
      setCart({
        products: [...updatedCartProducts],
        totalProductsCount: cart.totalProductsCount + 1,
        totalProductsAmount:
          cart.totalProductsAmount + updatedCartProducts[cartInd].price,
      });
    }
  };

  const handleRemoveOneProduct = (pId) => {
    const cartInd = cart.products.findIndex((p) => p.id === pId);
    let updatedCartProducts = JSON.parse(JSON.stringify(cart.products));
    if (cartInd !== -1) {
      updatedCartProducts[cartInd].quantity -= 1;

      if (updatedCartProducts[cartInd].quantity === 0) {
        setCart({
          products: [
            ...cart.products.filter(
              (productInCart) => pId !== productInCart.id
            ),
          ],
          totalProductsCount: cart.totalProductsCount - 1,
          totalProductsAmount:
            cart.totalProductsAmount - updatedCartProducts[cartInd].price,
        });
      } else
        setCart({
          products: [...updatedCartProducts],
          totalProductsCount: cart.totalProductsCount - 1,
          totalProductsAmount:
            cart.totalProductsAmount - updatedCartProducts[cartInd].price,
        });

      const prodInd = products.findIndex((p) => p.id === pId);
      let updatedProducts = JSON.parse(JSON.stringify(products));

      if (updatedProducts[prodInd].cartQuantity > 0) {
        updatedProducts[prodInd].quantity += 1;
        updatedProducts[prodInd].cartQuantity -= 1;
        setProducts(updatedProducts);
      }
    }
  };

  const handleRemoveProductFromCart = (pId) => {
    let cartProd = cart.products.filter(
      (productInCart) => pId === productInCart.id
    )[0];

    let countToDecrease = cartProd.quantity;

    setCart({
      products: [
        ...cart.products.filter((productInCart) => pId !== productInCart.id),
      ],
      totalProductsCount: cart.totalProductsCount - countToDecrease,
      totalProductsAmount:
        cart.totalProductsAmount - cartProd.price * countToDecrease,
    });

    const prodInd = products.findIndex((p) => p.id === pId);
    let updatedProducts = JSON.parse(JSON.stringify(products));

    updatedProducts[prodInd].quantity += countToDecrease;
    updatedProducts[prodInd].cartQuantity = 0;
    setProducts([...updatedProducts]);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/products").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].cartQuantity = 0;
      }
      setProducts(res.data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Login />
            <Cart
              cart={cart}
              removeProductFromCart={handleRemoveProductFromCart}
            />
            {products.length && (
              <Products
                products={products}
                addProductToCart={handleAddOneProduct}
                removeProductFromCart={handleRemoveOneProduct}
              />
            )}
          </Route>
          <Route exact path="/ProductMgmt">
            <Header />
            <ProductManagement />
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
