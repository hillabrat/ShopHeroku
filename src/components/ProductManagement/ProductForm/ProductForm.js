import React, { useState, useEffect } from "react";
import "./ProductForm.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { useRef } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const ProductForm = (props) => {
  console.log(props);
  const fileInput = useRef();

  const [product, setProduct] = useState({
    id: 0,
    title: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    quantity: 0,
    description: "",
  });

  const [title, setTitle] = useState();
  // const [isEditMode, setIsEditMode] = useState(false);
  // const [isAddMode, setIsAddMode] = useState(false);
  // //const [productInfo, setProductInfo] = useState(false);
  // const [product, setProduct] = useState();
  // // const [product, setProduct] = useState({
  // //   title: "",
  // //   image: "",
  // //   quantity: "",
  // //   price: "",
  // //   description: "",
  // // });

  // const firstTime = true;

  // const handleChange = (e) => {
  //   // console.log("e=", e);
  //   // console.log("e.target=", e.target);
  //   const { name, value } = e.target;
  //   setProduct((product) => ({
  //     ...product,
  //     [name]: value,
  //   }));
  // };
  // const handleTitleChange = (e) => {
  //   setProduct({ title: e.target.value });
  // };
  // const handlePriceChange = (e) => {
  //   //setTitle(e.target.value);
  //   setProduct({ title: e.target.value });
  // };
  // const handleQuantityChange = (e) => {
  //   //setTitle(e.target.value);
  //   setProduct({ title: e.target.value });
  // };

  const handleChange = (e) => {
    console.log("onChange e.target.name", e.target.name);
    console.log("onChange e.target.value", e.target.value);
    console.log("handleChange newProduct1=", newProduct);
    if (props.isAddMode) setNewProduct({ [e.target.name]: e.target.value });
    else setProduct({ [e.target.name]: e.target.value });
    console.log("handleChange newProduct2=", newProduct);
  };

  // const addProduct = () => {
  //   console.log("add product :", product);
  //   axios
  //     .post("http://localhost:8000/products/", product)
  //     .then((res) => console.log(res.data));
  // };

  // const updateProduct = (e) => {
  //   console.log("update product e:", e.target.value);
  //   console.log("update product :", product);
  //   console.log("update product id=", props.product.id);
  //   axios
  //     .put(`http://localhost:8000/products/${props.product.id}`, product)
  //     .then((res) => console.log(res.data));
  // };

  useEffect(() => {
    console.log("render isAddMode");
    console.log("props0=", props);
    setNewProduct({
      title: "",
      price: 0,
      quantity: 0,
      description: "",
    });
    console.log("props1=", props);
  }, [props.isAddMode]);

  useEffect(() => {
    console.log("props=", props);
    if (props.product && props.product.id !== 0) {
      //setTitle(props.product.title);

      setProduct({
        id: props.product.id,
        title: props.product.title,
        price: props.product.price,
        quantity: props.product.quantity,
        description: props.product.description,
      });

      console.log("props2=", props);
    }
  }, [props.product]);

  const addProduct = () => {
    console.log("add product");
    // for (props in product) {
    //   setProduct({ props: "" });
    // }

    const uploadedFile = fileInput.current;
    // if (uploadedFile.files.length > 0)
    console.log(" uploadedFile.files[0]=", uploadedFile.files[0]);
    // axios.put(`http://localhost:8000/products:${product.id}`, uploadedFile.files[0], {
    //   params: { filename: uploadedFile.files[0].name },
    //   onUploadProgress: (progressEvent) => {
    //     const percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     console.log(percentCompleted);
    //   },
    // });
  };

  const updateProduct = () => {
    console.log("update product");
    const uploadedFile = fileInput.current;
    console.log("uploadedFile=", uploadedFile);
  };

  return (
    (props.product !== undefined || props.isAddMode || props.isEditMode) && (
      <React.Fragment>
        <div className="productData">
          <FormControl>
            <div>
              <InputLabel htmlFor="component-simple">Title</InputLabel>
              <Input
                placeholder="Enter a product title"
                value={props.isAddMode ? "" : product.title}
                onChange={handleChange}
                disabled={!(props.isAddMode || props.isEditMode)}
                name="title"
              />
            </div>
          </FormControl>
          <FormControl>
            <div>
              <InputLabel htmlFor="component-simple">Price</InputLabel>
              <Input
                value={props.isAddMode ? "" : product.price}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={handleChange}
                name="price"
                disabled={!(props.isAddMode || props.isEditMode)}
                type="number"
              />
            </div>
          </FormControl>
          <FormControl>
            <div>
              <InputLabel htmlFor="component-simple">Quantity</InputLabel>
              <Input
                value={props.isAddMode ? "" : product.quantity}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                onChange={handleChange} //{handleQuantityChange}
                name="quantity"
                disabled={!(props.isAddMode || props.isEditMode)}
              />
            </div>
          </FormControl>
          <FormControl>
            <div>
              <InputLabel htmlFor="component-simple">Description</InputLabel>
              <Input
                placeholder="Enter the product description"
                value={props.isAddMode ? "" : product.description}
                disabled={!(props.isAddMode || props.isEditMode)}
                onChange={handleChange} //{handleDescriptionChange}
                name="description"
              />
            </div>
          </FormControl>
          <FormControl>
            <div>
              <InputLabel htmlFor="component-simple">Image</InputLabel>
              <Input
                type="file"
                ref={fileInput}
                placeholder="Select Product Image"
                value={props.isAddMode ? "" : product.image}
                onChange={handleChange}
                disabled={!(props.isAddMode || props.isEditMode)}
                name="image"
              />
            </div>
          </FormControl>
          <FormControl>
            <div className="productImage">
              <img
                src={
                  props.isAddMode
                    ? ""
                    : `http://localhost:8000/${props.product.image}`
                }
                alt="Loading..."
              ></img>
            </div>
          </FormControl>
          <FormControl>
            <div>
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
          </FormControl>
        </div>
      </React.Fragment>
    )
  );
};

export default ProductForm;
