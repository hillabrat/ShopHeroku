import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/header";
import Cart from "./components/Cart/cart";
import Products from "./components/Products/products";
import ProductDesc from "./components/ProductDesc/productDesc";
import ProductManagement from "./components/ProductManagement/ProductManagement";
import Login from "./components/Login/Login";
import axios from "axios";
import SearchProduct from "./components/SearchProduct/SearchProduct";
import createPersistedState from "use-persisted-state";
import LoginForm from "./components/LoginForm/LoginForm";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import socketIOClient from "socket.io-client";

const App = () => {
  const useCartState = createPersistedState("cart");
  const [searchStr, setSearchStr] = useState("");
  const [products, setProducts] = useState([]);
  const productsRef = useRef(products);

  const [cart, setCart] = useCartState({
    products: [],
    totalProductsCount: 0,
    totalProductsAmount: 0,
  });

  const [title, setTitle] = useState("Hilla's Shop");
  const [errorMessage, setErrorMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  const handleAddOneProduct = (pId) => {
    let shouldAddProduct = true;
    const prodInd = products.findIndex((p) => p._id === pId);
    let updatedProducts = JSON.parse(JSON.stringify(products));
    if (updatedProducts[prodInd].quantity > 0) {
      updatedProducts[prodInd].quantity -= 1;
      updatedProducts[prodInd].cartQuantity += 1;
      setProducts(updatedProducts);
    } else {
      alert("product is out of stock");
      shouldAddProduct = false;
    }

    if (!shouldAddProduct) return;

    const cartInd = cart.products.findIndex((p) => p._id === pId);
    if (cartInd === -1) {
      let productToAdd = JSON.parse(JSON.stringify(products[prodInd]));
      productToAdd.quantity = 1;

      setCart({
        products: [...cart.products, productToAdd],
        totalProductsCount: cart.totalProductsCount + 1,
        totalProductsAmount: cart.totalProductsAmount + productToAdd.price,
      });
    } else {
      let updatedCartProducts = cart.products;
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
    const cartInd = cart.products.findIndex((p) => p._id === pId);
    let updatedCartProducts = cart.products;
    if (cartInd !== -1) {
      updatedCartProducts[cartInd].quantity -= 1;

      if (updatedCartProducts[cartInd].quantity === 0) {
        setCart({
          products: [
            ...cart.products.filter(
              (productInCart) => pId !== productInCart._id
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

      const prodInd = products.findIndex((p) => p._id === pId);
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
      (productInCart) => pId === productInCart._id
    )[0];

    let countToDecrease = cartProd.quantity;

    setCart({
      products: [
        ...cart.products.filter((productInCart) => pId !== productInCart._id),
      ],
      totalProductsCount: cart.totalProductsCount - countToDecrease,
      totalProductsAmount:
        cart.totalProductsAmount - cartProd.price * countToDecrease,
    });

    const prodInd = products.findIndex((p) => p._id === pId);
    let updatedProducts = products;

    updatedProducts[prodInd].quantity += countToDecrease;
    updatedProducts[prodInd].cartQuantity = 0;
    setProducts([...updatedProducts]);
  };

  const searchForProduct = (searchStr) => {
    setSearchStr(searchStr);
  };

  const updateProductQuantity = (pId, newQuantity) => {
    const prodInd = productsRef.current.findIndex((p) => p._id === +pId);
    let updatedProducts = JSON.parse(JSON.stringify(productsRef.current));

    updatedProducts[prodInd].quantity = newQuantity;

    setProducts(updatedProducts);
  };

  // subscribe to socket update event
  const subscribeToUpdateQuantityEvent = (interval = 1000) => {
    socket.emit("getProductQuantityToUpdate", interval);
  };

  useEffect(() => {
    console.log("useEffect", products);
    console.log("useEffect", searchStr);
    async function fetchData() {
      await axios.get(`/products?search=${searchStr}`).then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].cartQuantity = 0;
        }
        setProducts(res.data);
      });
    }
    fetchData();
  }, [searchStr]);

  useEffect(() => {
    console.log("!!!");
    productsRef.current = products;
    console.log("productsRef.current", productsRef.current);
  }, [products]);

  useEffect(() => {
    setSocket(socketIOClient(""));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setSocketConnected(socket.connected);
      subscribeToUpdateQuantityEvent();
    });
    socket.on("disconnect", () => {
      setSocketConnected(socket.connected);
    });

    socket.on("getProductQuantityToUpdate", (pId, pQuantity) => {
      updateProductQuantity(pId, pQuantity);
    });
  }, [socket]);

  const handleSocketConnection = () => {
    if (socketConnected) socket.disconnect();
    else {
      socket.connect();
    }
  };

  return (
    <Router>
      <div className="App">
        <Header title={title} />
        <Login />
        <Switch>
          <Route exact path="/">
            <Cart
              cart={cart}
              removeProductFromCart={handleRemoveProductFromCart}
            />
            <div className="Products">
              <h2>
                Products <SearchProduct searchForProduct={searchForProduct} />
              </h2>
              {products.length && (
                <Products
                  products={products}
                  addProductToCart={handleAddOneProduct}
                  removeProductFromCart={handleRemoveOneProduct}
                  searchForProduct={searchForProduct}
                />
              )}
            </div>
          </Route>
          <Route exact path="/ProductMgmt">
            <Header />
            <ProductManagement />
          </Route>
          <Route path="/products/:idParam">
            <ProductDesc />
          </Route>
          <Route path="/register">
            <RegistrationForm
              showError={setErrorMessage}
              updateTitle={setTitle}
            />
          </Route>
          <Route path="/login">
            <LoginForm showError={setErrorMessage} updateTitle={setTitle} />
          </Route>
        </Switch>
      </div>
      {/* <div style={{ padding: "30px" }}>
        {productQuantity && (
          <div>
            {productQuantity.title} qunatity has updated to
            {productQuantity.quantity} items.
          </div>
        )}
      </div> */}
    </Router>
  );
};

export default App;
