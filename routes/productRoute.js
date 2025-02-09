const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const {
  AllProduct,
  addProduct,
  getProduct,
  editProduct,
  deleteProduct,
  commentProduct,
  editcommentProduct,
  deletecommentProduct,
  getProfile,
  getallProfile,
} = require("../controller/routerController");

//All Products router
router.get("/product", AllProduct);

//Get All Profile data
router.get("/profile", getallProfile);
//get the particular profile
router.get("/profile/:id", getProfile);
//create the product
router.post("/product", addProduct);

// show a particular Product
router.get("/product/:id", getProduct);

//Edit the Product
router.patch("/product/:id/edit", editProduct);

//DElete the product
router.delete("/product/:id/delete", deleteProduct);

//comment on the product
router.post("/product/:id/review", commentProduct);

//update the comment of the product
router.patch("/product/:Rid/review", editcommentProduct);

//delete the comment of the product
router.delete("/product/:Rid/review/delete", deletecommentProduct);

module.exports = router;
