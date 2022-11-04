const {
  createUser,
  signin,
  getAllUsers,
  updateUser,
  getUserById,
  addAddress,
  addPaymentMethod,
  updatePassword,
} = require("../controllers/user/UserController");

const {
  editProduct,
  getAllProducts,
  getProductById,
  registerProduct,
  removeProduct,
} = require("../controllers/restaurant/ProductsController");
const verifyToken = require("../middlewares/verifyToken");
const imageUpload = require("../middlewares/imageUpload");
const admin = require("../middlewares/admin");
const router = require("express").Router();

// users
router.get("/allusers", getAllUsers);
router.get("/user/:id", getUserById);
router.post("/newuser", createUser);
router.post("/signin", signin);
router.patch("/user/update/:id", imageUpload, updateUser);
router.patch("/user/payment/:id", verifyToken, addPaymentMethod);
router.patch("/user/address/:id", verifyToken, addAddress);
router.patch("/user/password/:id", updatePassword);

//products
router.get("/products", verifyToken, getAllProducts);
router.get("/products:id", verifyToken, getProductById);
router.post("/product/register", admin,imageUpload, registerProduct);
router.patch("/product/edit/:id", verifyToken, admin, editProduct);
router.delete("/products/delete/:id", admin, removeProduct);

module.exports = router;
