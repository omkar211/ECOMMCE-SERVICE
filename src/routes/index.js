const express = require("express");
const { validate } = require("express-validation");
const router = express.Router();

const { health } = require("../controllers/healthCheck/healthCheck.controller");

// User's endpoint
const { createUser } = require("../controllers/users/createUser.controller");
const { updateUser } = require("../controllers/users/updateUser.controller");

const {
  updateUserValidation,
} = require("../controllers/users/updateUser.validator");
const {
  createUserValidation,
} = require("../controllers/users/createUser.validator");

const { loginUser } = require("../controllers/users/loginUser.controller");
const {
  loginUserValidation,
} = require("../controllers/users/loginUser.validator");

const {
  getUserDetails,
} = require("../controllers/users/getUserDetails.controller");

// Product's endpoints
const { addProduct } = require("../controllers/product/addProduct.controller");
const {
  addProductValidation,
} = require("../controllers/product/addProduct.validator");

const {
  deleteProduct,
} = require("../controllers/product/deleteProduct.controller");
const {
  deleteProductValidation,
} = require("../controllers/product/deleteProduct.validator");

const {
  updateProduct,
} = require("../controllers/product/updateProduct.controller");
const {
  updateProductValidation,
} = require("../controllers/product/updateProduct.validator");

const {
  getAllProduct,
} = require("../controllers/product/getAllProducts.controller");
const {
  getProductDetails,
} = require("../controllers/product/getProductDetails.controller");

const {
  getProductDetailsValidation,
} = require("../controllers/product/getProductDetails.validator");

// Order's endpoint
const {
  getOrderByUser,
} = require("../controllers/orders/getOrderByUser.controller");

const { placeOrder } = require("../controllers/orders/placeOrder.controller");
const {
  placeOrderValidation,
} = require("../controllers/orders/placeOrder.validator");
const { adminRoleAuth } = require("../middleware/adminRoleAuth");

router.get("/health", health);

router.post(
  "/createUser",
  validate(createUserValidation, {}, { abortEarly: false, allowUnknown: true }),
  createUser
);
router.post(
  "/updateUser",
  validate(updateUserValidation, {}, { abortEarly: false, allowUnknown: true }),
  updateUser
);
router.post(
  "/login",
  validate(loginUserValidation, {}, { abortEarly: false, allowUnknown: true }),
  loginUser
);
router.post("/getUserDetails", getUserDetails);

router.post(
  "/addProduct",
  adminRoleAuth,
  validate(addProductValidation, {}, { abortEarly: false, allowUnknown: true }),
  addProduct
);
router.post(
  "/deleteProduct",
  adminRoleAuth,
  validate(
    deleteProductValidation,
    {},
    { abortEarly: false, allowUnknown: true }
  ),
  deleteProduct
);
router.post(
  "/updateProduct",
  adminRoleAuth,
  validate(
    updateProductValidation,
    {},
    { abortEarly: false, allowUnknown: true }
  ),
  updateProduct
);
router.post("/getAllProduct", getAllProduct);

router.post(
  "/getProductDetails",
  validate(
    getProductDetailsValidation,
    {},
    { abortEarly: false, allowUnknown: true }
  ),
  getProductDetails
);
router.post("/getOrderByUser", getOrderByUser);

router.post(
  "/placeOrder",
  validate(placeOrderValidation, {}, { abortEarly: false, allowUnknown: true }),
  placeOrder
);

module.exports = router;
