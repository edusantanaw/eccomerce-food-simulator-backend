const {
  createUser,
  signin,
  getAllUsers,
  updateUser,
  getUserById,
  addAddress,
  updatePassword,
} = require("../controllers/user/UserController");

const {
  editProduct,
  getAllProducts,
  getProductById,
  registerProduct,
  removeProduct,
  getDeals,
  filteByCategory,
} = require("../controllers/restaurant/ProductsController");

const {
  acceptOrDeclineOrder,
  getPeddingOrders,
  getOrderByUser,
  order,
} = require("../controllers/restaurant/OrderController");

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
router.patch("/user/address/:id", verifyToken, addAddress);
router.patch("/user/password/:id", updatePassword);

//products
router.get("/products", verifyToken, getAllProducts);
router.get("/products/deals", verifyToken, getDeals);
router.get("/products/category/:category", verifyToken, filteByCategory);
router.get("/products/:id", verifyToken, getProductById);
router.post("/product/register", admin, imageUpload, registerProduct);
router.patch("/product/edit/:id", verifyToken, imageUpload, admin, editProduct);
router.delete("/products/delete/:id", admin, removeProduct);

//orders
router.get('/orders', admin, getPeddingOrders);
router.get('/order/:id', verifyToken, getOrderByUser)
router.post('/order/new', verifyToken, order )
router.patch('/order/status/:id', admin, acceptOrDeclineOrder)

module.exports = router;
