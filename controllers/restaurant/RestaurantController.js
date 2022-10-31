const Restaurant = require("../../models/restaurant");
const {existsOrError} = require('../../helpers/existsOrError')

const registerRestaurant = async (req, res) => {
  const { name, location, phoneNumber } = req.body;

  try {
    existsOrError(name, "O nome do restaurante é obrigatorio!");
    existsOrError(location, "A localização do restaurante é obrigatoria!");
    existsOrError(phoneNumber, "O numero de telefone do restaurante é obrigatorio!");

    const existsName = await Restaurant.findOne({name: name})  
    if(existsName) throw 'Este nome de restaurante já está cadastrado no sistema!'
   
    const existsPhone = await Restaurant.findOne({phoneNumber: phoneNumber})
    if(existsPhone) throw 'Este numero de telefone já esta sendo usado por outro restaurante!'
   
    const existsLocation = await Restaurant.findOne({phoneNumber: phoneNumber})
    if(existsLocation) throw 'Este nome de restaurante já está cadastrado no sistema!'

    const newRestaurant = new Restaurant({
        name: name,
        location: location,
        phoneNumber: phoneNumber
    })
    await newRestaurant.save()
    res.status(200).send('Restaurante cadastrado com sucesso!')

  } catch (error) {
    res.status(401).send({error: error});
  }
};

module.exports = { registerRestaurant };
