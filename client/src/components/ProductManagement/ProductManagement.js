import React, { useState, useEffect } from "react";
import "./ProductManagement.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import { useRef } from "react";
import { TextareaAutosize, TextField } from "@material-ui/core";

const ProductManagement = (props) => {
  const [products, setProducts] = useState([]);
  const productsRef = useRef(products);
  const [productId, setProductId] = useState();
  const [product, setProduct] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [previewImg, setPreviewImg] = useState("/images/NoImage.png");

  const formData = require("form-data");

  let titleInput = useRef();
  let priceInput = useRef();
  let quantityInput = useRef();
  let descriptionInput = useRef();
  let imageInput = useRef();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    productsRef.current = products;
  }, [products]);

  const loadProducts = async () => {
    await axios.get("/products?search=").then((res) => {
      setProducts(res.data);
      clearFormData();
    });
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  }));

  const addProduct = () => {
    const uploadedFile = imageInput.current;
    let file;
    if (uploadedFile.files.length) file = uploadedFile.files[0].name;
    else file = "";

    let data = new FormData();
    data.append("title", product.title);
    data.append("quantity", product.quantity);
    data.append("price", product.price);
    data.append("description", product.description);
    if (file !== "")
      data.append("image", uploadedFile.files[0], uploadedFile.files[0].name);

    axios
      .post("/products/", data)
      .then((response) => console.log(response))
      .catch((error) => console.log("error", error));

    loadProducts();
  };

  const updateProduct = () => {
    const uploadedFile = imageInput.current;

    let data = new FormData();
    data.append("title", product.title);
    data.append("quantity", product.quantity);
    data.append("price", product.price);
    data.append("description", product.description);
    if (uploadedFile.files.length)
      data.append("image", uploadedFile.files[0], uploadedFile.files[0].name);

    axios
      .put(`/Products/${productId}`, data)
      .then((response) => console.log(response))
      .catch((error) => console.log("error", error));

    loadProducts();
  };

  const clearFormData = () => {
    setProduct({
      ...product,
      title: "",
      quantity: 0,
      price: 0,
      description: "",
    });

    setPreviewImg("/images/NoImage.png");
  };

  const handleProductClick = (e) => {
    showSelectedProduct(e.target.id, false, false);
  };

  const showSelectedProduct = (pId, isEditMode) => {
    setProductId(pId);
    setProduct(productsRef.current.filter((p) => p._id === +pId)[0]);
    setPreviewImg(
      `/${productsRef.current.filter((p) => p._id === +pId)[0].image}`
    );
    setAddMode(false);
    setEditMode(isEditMode);
  };

  const handleProductAdd = (e) => {
    clearFormData();
    setAddMode(true);
    setEditMode(false);
  };

  const handleProductDelete = (pId) => {
    setAddMode(false);
    setEditMode(false);
    console.log("deleting product id = ", pId);
    axios.delete(`/products/${pId}`).then((res) => console.log(res.data));

    setProducts(productsRef.current.filter((p) => p._id !== pId));
  };

  const handleEditProduct = (pId) => {
    console.log("handleEditProduct = ", pId);
    showSelectedProduct(pId, true);
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value, // update the value of specific key
    });
  };

  const onImageChange = (e) => {
    console.log("omImageChange", e);
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      console.log("e.target.files[0]", e.target.files[0]);
      reader.onload = (e) => {
        console.log("e.target.result", e.target.result);
        setPreviewImg(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addMode) addProduct();
    else {
      updateProduct();
    }
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="productsMgmt">
        <div className="productData">
          <form onSubmit={handleSubmit}>
            <div className="productFields">
              <div>
                {/* <InputLabel htmlFor="component-simple">Title</InputLabel> */}
                <TextField
                  required
                  label="Title"
                  ref={titleInput}
                  placeholder="Enter Title"
                  value={product.title || ""}
                  onChange={handleChange}
                  disabled={!(addMode || editMode)}
                  name="title"
                />
              </div>
              <div>
                {/* <InputLabel htmlFor="component-simple">Price</InputLabel> */}
                <TextField
                  required
                  label="Price"
                  ref={priceInput}
                  placeholder="Enter Price"
                  value={product.price || ""}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={handleChange}
                  name="price"
                  disabled={!(addMode || editMode)}
                  type="number"
                />
              </div>
              <div>
                {/* <InputLabel htmlFor="component-simple">Quantity</InputLabel> */}
                <TextField
                  required
                  label="Quantity"
                  ref={quantityInput}
                  placeholder="Enter Quantity"
                  value={product.quantity || ""}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={handleChange} //{handleQuantityChange}
                  name="quantity"
                  disabled={!(addMode || editMode)}
                  type="number"
                />
              </div>
            </div>
            <div className="productDescription">
              {/* <InputLabel htmlFor="component-simple">Description</InputLabel> */}
              <TextField
                required
                label="Description"
                ref={descriptionInput}
                placeholder="Enter Description"
                value={product.description || ""}
                disabled={!(addMode || editMode)}
                onChange={handleChange} //{handleDescriptionChange}
                name="description"
                multiline
                rows={6}
              />
            </div>
            <div className="productImage">
              <input type="button" class="selectImage" value="Select Image" />
              <input
                type="file"
                ref={imageInput}
                placeholder="Select Image"
                //value={addMode || editMode ? previewImg : product.image}
                //value={previewImg}
                //onChange={handleChange}
                disabled={!(addMode || editMode)}
                name="image"
                onChange={onImageChange}
                id="imgInp"
              />
              <img
                src={
                  previewImg
                  // addMode
                  //   ? previewImg
                  //   : `/${product.image}`
                }
                alt="Loading..."
              ></img>
            </div>
            <div className="actionButton">
              <Button
                type="submit"
                onClick={addMode ? addProduct : editMode ? updateProduct : ""}
              >
                {addMode ? "Add Product" : editMode ? "Update Product" : ""}
              </Button>
            </div>
          </form>
        </div>
        <div className="productsList">
          <GridList cellHeight={180} className={classes.gridList} cols={4}>
            <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
              <ListSubheader component="div">All Products</ListSubheader>
            </GridListTile>
            <GridListTile key={0}>
              <img src="/images/newProduct.jpg" alt="new product" />
              <GridListTileBar
                title={"Add Product"}
                actionIcon={
                  <IconButton
                    aria-label={`dsfsdfsdf`}
                    className={classes.icon}
                    onClick={handleProductAdd}
                  >
                    <AddBoxIcon />
                  </IconButton>
                }
              />
            </GridListTile>
            {products
              .filter((p) => p._id !== 0)
              .map((p, index) => (
                <GridListTile className="productTile" key={p._id}>
                  <img
                    src={`/${p.image}`}
                    alt={p.title}
                    onClick={handleProductClick}
                    id={p._id}
                  />
                  <GridListTileBar
                    title={p.title}
                    subtitle={
                      <span>
                        price: {p.price} quantity: {p.quantity}
                      </span>
                    }
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${p.title}`}
                        className={classes.icon}
                      >
                        <EditIcon onClick={() => handleEditProduct(p._id)} />
                        <DeleteIcon
                          onClick={() => handleProductDelete(p._id)}
                        />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
          </GridList>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductManagement;
