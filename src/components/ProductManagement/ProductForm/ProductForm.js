import React, { useState } from "react";
import "./ProductForm.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ProductForm = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  //const [productInfo, setProductInfo] = useState(false);
  const [product, setProduct] = useState(props.product);
  // const [product, setProduct] = useState({
  //   title: "",
  //   image: "",
  //   quantity: "",
  //   price: "",
  //   description: "",
  // });

  const firstTime = true;

  const handleChange = (e) => {
    // console.log("e=", e);
    // console.log("e.target=", e.target);
    const { name, value } = e.target;
    setProduct((product) => ({
      ...product,
      [name]: value,
    }));
  };
  // const onChange = (e) => {
  //   console.log("onChange", e.target.value);
  // };

  // const onChange = (e) => {
  //   const p = { ...productInfo };
  //   s.font.align = event.target.value;
  //   setProductInfo(p);
  // };
  const onFormLayoutChange = (e) => {
    console.log("onFormLayoutChange=", e);
  };

  const addProduct = () => {
    console.log("add product :", product);
    axios
      .post("http://localhost:8000/products/", product)
      .then((res) => console.log(res.data));
  };

  const updateProduct = (e) => {
    console.log("update product e:", e.target.value);
    console.log("update product :", product);
    console.log("update product id=", props.product.id);
    axios
      .put(`http://localhost:8000/products/${props.product.id}`, product)
      .then((res) => console.log(res.data));
  };

  // useEffect(() => {
  //   setProduct(props.product);
  //   setIsEditMode(props.isEditMode);
  //   setIsAddMode(props.isAddMode);
  //   console.log(
  //     "useEffect[][]",
  //     "props.product=",
  //     props.product,
  //     "props.isAddMode=",
  //     props.isAddMode,
  //     "props.isEditMode=",
  //     props.isEditMode
  //   );
  //   //if (props.product === undefined) setIsAddMode(true);
  // }, [props.product, isAddMode, isEditMode]);

  // useEffect(() => {
  //   console.log(
  //     "useEffect() render!!",
  //     "props.product=",
  //     props.product,
  //     "isAddMode=",
  //     isAddMode
  //   );
  // console.log("isAddMode=", props.isAddMode);
  // console.log(props.product.title);
  //setProduct(props.product);
  //setIsEditMode(props.isEditMode);
  //setIsAddMode(props.isAddMode);
  // //
  // console.log(props.product);
  // console.log("props.isEditMode=", props.isEditMode);
  // console.log("props.isAddMode=", props.isAddMode);
  //});

  return (
    (props.product !== undefined || props.isAddMode || props.isEditMode) && (
      <React.Fragment>
        <div className="productData">
          <Input
            placeholder="Enter a product title"
            defaultValue={props.isAddMode ? "" : props.product.title}
            // onChange={(e) => {
            //   productInfo.title = e.target.value;
            //   console.log(e.target.value);
            // }}
            onChange={handleChange}
            name="title"
            disabled={!(props.isAddMode || props.isEditMode)}
          />

          <Input
            placeholder="Enter an image url"
            defaultValue={props.isAddMode ? "" : props.product.image}
            disabled={!(props.isAddMode || props.isEditMode)}
            onChange={handleChange}
            name="image"
          />

          <Input
            defaultValue={props.isAddMode ? "" : props.product.price}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(e) => {
              product.price = e;
            }}
            name="price"
            disabled={!(props.isAddMode || props.isEditMode)}
            type="number"
          />

          <Input
            defaultValue={props.isAddMode ? "" : props.product.quantity}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(e) => {
              product.quantity = e;
            }}
            name="quantity"
            disabled={!(props.isAddMode || props.isEditMode)}
          />

          <Input
            placeholder="Enter the product description"
            defaultValue={props.isAddMode ? "" : props.product.description}
            disabled={!(props.isAddMode || props.isEditMode)}
            onChange={handleChange}
            name="description"
          />

          <Button
            type="primary"
            onClick={
              props.isAddMode
                ? addProduct
                : props.isEditMode
                ? updateProduct
                : ""
            }
          >
            {props.isAddMode
              ? "Add Product"
              : props.isEditMode
              ? "Update Product"
              : ""}
          </Button>
        </div>
        <div className="productImage">
          {/* <label>{props.product.title}</label> */}
          <img
            src={props.isAddMode ? "" : props.product.image}
            alt="Loading..."
          ></img>
        </div>
      </React.Fragment>
    )
  );
};

export default ProductForm;
