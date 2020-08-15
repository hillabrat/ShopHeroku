import React, { useState, useEffect } from "react";
import "./ProductManagement.css";
import ProductForm from "./ProductForm/ProductForm";
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

const ProductManagement = (props) => {
  const [products, setProducts] = useState([]);
  const [productKey, setProductKey] = useState(1);
  //const [product, setProduct] = useState();
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/products/").then((res) => {
      setProducts(res.data);
    });
  }, []);

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

  const handleAddNewProduct = () => {
    setProductKey(0);
    setAddMode(true);
    setEditMode(false);
  };

  const handleProductClick = (e) => {
    console.log("handleProductClick=", e.target.id);
    setProductKey(e.target.id);
    setAddMode(false);
    setEditMode(false);
  };

  const handleProductDelete = (id) => {
    setAddMode(false);
    setEditMode(false);
    console.log("deleting product id = ", id);
    axios
      .delete("http://localhost:8000/products/{id}")
      .then((res) => console.log(res.data));

    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditProduct = (id) => {
    setEditMode(true);
    setAddMode(false);
  };

  // const deleteProduct = () => {
  //   axios
  //     .delete("http://localhost:8000/products/${id}")
  //     .then((res) => console.log(res.data));
  // };

  const classes = useStyles();
  return (
    <div className="productsMgmt">
      <div className="productsList">
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">All Products</ListSubheader>
          </GridListTile>
          <GridListTile key={0}>
            <img src="" alt="empty" />
            <GridListTileBar
              title={"Add Product"}
              actionIcon={
                <IconButton
                  aria-label={`dsfsdfsdf`}
                  className={classes.icon}
                  onClick={handleAddNewProduct}
                >
                  <AddBoxIcon />
                </IconButton>
              }
            />
          </GridListTile>
          {products.map((p, index) => (
            <GridListTile className="productTile" key={p.id}>
              <img
                src={p.image}
                alt={p.title}
                onClick={handleProductClick}
                id={p.id}
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
                    <EditIcon onClick={() => handleEditProduct(p.id)} />
                    <DeleteIcon onClick={() => handleProductDelete(p.id)} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      {
        <ProductForm
          product={products.find((p) => p.id === +productKey)}
          isEditMode={editMode}
          isAddMode={addMode}
        />
      }
    </div>
  );
};

export default ProductManagement;
