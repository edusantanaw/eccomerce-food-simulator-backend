const {
  createUser,
  signin,
  getAllUsers,
  updateUser,
} = require("../controllers/user/UserController");
const {
  registerRestaurant,
  getAllRestaurants,
  updateRestaurant,
} = require("../controllers/restaurant/RestaurantController");

const {
  editProduct,
  getAllProducts,
  getProductById,
  registerProduct,
  removeProduct,
} = require("../controllers/restaurant/ProductsController");
const verifyToken = require("../middlewares/verifyToken");

const imageUpload = require('../middlewares/imageUpload')

const router = require("express").Router();

// users
router.get("/allusers", getAllUsers);
router.post("/newuser", createUser);
router.post("/signin", signin);
router.patch("/user/update/:id",imageUpload, updateUser);

//restaurants
router.get("/restaurants", verifyToken, getAllRestaurants);
router.post("/registerrestaurant", verifyToken, registerRestaurant);
router.patch("/restaurant/update", verifyToken, updateRestaurant);

//products
router.get("/products", verifyToken, getAllProducts);
router.get("/products:id", verifyToken, getProductById);
router.post("/resisterproducts", verifyToken, registerProduct);
router.patch("/editproduct", verifyToken, editProduct);
router.delete("/products/delete/:id", removeProduct);

module.exports = router;
