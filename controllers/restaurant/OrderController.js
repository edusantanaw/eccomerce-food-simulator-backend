const Order = require("../../models/order");
const Products = require("../../models/products");
const getToken = require("../../helpers/getToken");
const getUserByToken = require("../../helpers/getUserByToken");
const { validId } = require("../../helpers/existsOrError");

const order = async (req, res) => {
  const requests = req.body;
  const token = getToken(req);
  const user = await getUserByToken(token);
  try {
    if (!requests) throw "Os produtos são necessarios!";
    const product = [];
    for (let i = 0; i < requests.length; i++) {
      const prod = {
        product: await Products.findOne({ _id: requests[i].prod }),
        quantity: requests[i].quantity === undefined ? 1 : requests[i].quantity,
      };
      product.push(prod);
    }

    const orders = await Order.find();
    const numberOrder = orders.length + 1;

    const newOrder = new Order({
      client: user._id,
      product: product,
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
    const order = await Order.find({ client: id });
    if (!order) throw "Nenhum pedido encontrado!";

    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const getPeddingOrders = async (req, res) => {
  const orders = await Order.find().where({ status: "pedding" });
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
    newStatus ? (order.status = "accepted") : (order.status = "denied");

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

module.exports = {
  order,
  getOrderByUser,
  getPeddingOrders,
  acceptOrDeclineOrder,
};
