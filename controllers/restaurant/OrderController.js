const Order = require("../../models/order");
const Products = require("../../models/products");
const User = require("../../models/user");
const getToken = require("../../helpers/getToken");
const getUserByToken = require("../../helpers/getUserByToken");
const { validId } = require("../../helpers/existsOrError");

const order = async (req, res) => {
  // request must be an array of ids
  const { requests } = req.body;
  const token = getToken(req);
  const user = getUserByToken(token);

  try {
    if (!user) throw "Usuario não encontrado!";

    //verify if all products exists
    const products = requests
      .filter(async (product) => {
        const verifyExists = await Products.findOne({ _id: product });
        if (!verifyExists) return product;
      })
      .map(
        (products) =>
          (products = `O produto com o id: ${products} não foi encontrado!`)
      );

    if (products) throw products;
    const orders = await Order.find();
    const numberOrder = orders.length + 1;

    const newOrder = new Order({
      user: user._id,
      products: requests,
      numberOrder: numberOrder,
      status: "pedding",
    });

    await newOrder.save();

    res.status(200).send("Pedido realizado com sucesso!");
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const getOrderByUser = async (req, res) => {
  const id = req.params.id;

  try {
    validId(id);
    const order = await Order.findOne({ user: id });
    if (!order) throw "Nenhum pedido encontrado!";
    const products = order.product;

    if (products.length === 0) throw "Nenhum produto encontrado!";

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  if (!orders || orders.length === 0)
    return res.status(400).send({ error: "Nenhum pedido encontrado!" });
  res.status(200).send(orders);
};

const acceptOrDeclineOrder = async (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  try {
    validId(id);
    const order = await Order.findOne({ _id: id });
    if (!order) throw "Pedido não encontrado!";
    newStatus === "accepted"
      ? (order.status = "accepted")
      : (order.status = "denied");

    await Order.findByIdAndUpdate(
      { _id: order._id },
      { $set: order },
      { new: true }
    );

    res.status(200).send("Status do pedido atualizado com sucesso!");
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = { order, getOrderByUser, getAllOrders, acceptOrDeclineOrder };
