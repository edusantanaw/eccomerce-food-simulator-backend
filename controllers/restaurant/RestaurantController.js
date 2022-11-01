const Restaurant = require("../../models/restaurant");
const { existsOrError, validId } = require("../../helpers/existsOrError");
const getToken = require("../../helpers/getToken");
const getUserByToken = require("../../helpers/getUserByToken");

const registerRestaurant = async (req, res) => {
  const { name, location, phoneNumber } = req.body;
  const token = getToken(req);
  const user = getUserByToken(token);

  try {
    validId(id);
    existsOrError(name, "O nome do restaurante é obrigatorio!");
    existsOrError(location, "A localização do restaurante é obrigatoria!");
    existsOrError(
      phoneNumber,
      "O numero de telefone do restaurante é obrigatorio!"
    );

    const existsName = await Restaurant.findOne({ name: name });
    if (existsName)
      throw "Este nome de restaurante já está cadastrado no sistema!";

    const existsPhone = await Restaurant.findOne({ phoneNumber: phoneNumber });
    if (existsPhone)
      throw "Este numero de telefone já esta sendo usado por outro restaurante!";

    const existsLocation = await Restaurant.findOne({
      phoneNumber: phoneNumber,
    });
    if (existsLocation)
      throw "Este nome de restaurante já está cadastrado no sistema!";

    const userHaveRestaurant = await Restaurant.findOne({ owner: user._id });
    if (userHaveRestaurant) throw "O usuario já tem um restaurante cadastrado!";

    const newRestaurant = new Restaurant({
      name: name,
      location: location,
      phoneNumber: phoneNumber,
      owner: user._id,
    });
    await newRestaurant.save();
    res.status(200).send("Restaurante cadastrado com sucesso!");
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    if (!restaurants || restaurants.length === 0)
      throw "Nenhum restaurante encontrado!";

    res.status(201).send(restaurants);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const updateRestaurant = async (req, res) => {
  const { name, location, phoneNumber } = req.body;
  const id = req.params.id;

  try {
    if (!req.body) throw "Nenhum dado atualizado!";
    const restaurant = await Restaurant.findOne({ id: id });
    if (!restaurant) throw "Nenhum restaurante encontrado!";
    if (name) restaurant.name = name;
    if (location) restaurant.location = location;
    if (phoneNumber) restaurant.phoneNumber = phoneNumber;

    await Restaurant.findOneAndUpdate(
      { _id: restaurant._id },
      { $set: restaurant },
      { new: true }
    );
    res.status(201).send("Restaurante atualizado com sucesso!");
  
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

module.exports = { registerRestaurant, getAllRestaurants, updateRestaurant };
