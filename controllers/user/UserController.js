const createUserToken = require("../../helpers/createToken");
const { existsOrError, validId } = require("../../helpers/existsOrError");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req;

  try {
    existsOrError(firstName, "O primeiro nome é necessario!");
    existsOrError(lastName, "O primeiro nome é necessario!");
    existsOrError(email, "O email é necessario!");
    existsOrError(password, "A senha é necessaria!");
    existsOrError(confirmPassword, "A confirmarção d2e senha é necessaria!");
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) throw "Este email já está sendo usado!";

    if (password !== confirmPassword) throw "As senhas devem ser iguais!";
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    delete password;
    delete confirmPassword;

    const user = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    const newUser = await user.save();
    createUserToken(newUser, res);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    existsOrError(email, "O email é necessario!");
    existsOrError(password, "A senha é necessaria!");
    const user = await User.findOne({ email: email });
    if (!user) throw "Usuario não encontrado!";
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw "Email/senha não coecidem!";

    createUserToken(user, res);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, email, phoneNumber } = req.body;
  const image = req.files[0];
  console.log(phoneNumber);
  try {
    validId(userId);
    if (!req.body || req.body.length === 0) throw "Nenhum dado atualizado!";
    const user = await User.findOne({ _id: userId });
    if (!user) throw "Usuario não encontrado!";

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (email && user.email !== email) {
      const verifyEmail = await User.find({ email: email });
      if (verifyEmail.length > 0)
        throw "Este email já está sendo usado por outro usuario!";
      user.email = email;
    }
    if (image) user.perfilPhoto = image.path;
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true }
    );
    createUserToken(user, res);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) throw "Nenhum usuario encontrado!";
    res.status(200).send(users);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    validId(id);
    const user = await User.findOne({ _id: id });
    if (!user) throw "Nenhum usario encontrado!";

    res.status(200).send(user);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const addAddress = async (req, res) => {
  const id = req.params.id;
  const { street, number, city, cep } = req.body;

  try {
    validId(id);
    const user = await User.findOne({ _id: id });
    if (!user) throw "Nenhum user encontrado!";

    existsOrError(street, "A rua é necessaria!");
    existsOrError(number, "O numero é necessario!");
    existsOrError(city, "A cidade é necessaria!");
    existsOrError(cep, "O cep é necessario!");

    const address = {
      street,
      number,
      city,
      cep,
    };
    user.address = address;
    await User.findOneAndUpdate(
      { _id: user._id },
      { $set: user },
      { new: true }
    );

    res.status(200).send("usuario atualizado com sucesso!");
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const addPaymentMethod = async (req, res) =>{
  const id = req.params.id
  const {cardNumber, name, cvv, date } = req.body

  try {
    validId(id)
    const user = await User.findOne({_id: id})
    if(!user) throw 'Usuario não encontrado!'

    existsOrError(name, 'O nome do cartao é necessario!')
    existsOrError(cardNumber, 'O numero do cartão é necessario!')
    existsOrError(cvv, 'O cvv do cartão é necessario!')
    existsOrError(date, 'A data de vencimento é necessaria!')

    const card = {
      name,
      cardNumber,
      cvv,
      date
    }
    user.paymentMethods = card

    await User.findOneAndUpdate(
      {_id: user._id},
      {$set: user},
      {new: true}
      
    )
    
    res.status(201).send('Metodo de pagamento adicionado com sucesso!')
    
  } catch (error) {
    res.status(401).send({error: error})
  }
}

module.exports = {
  createUser,
  getUserById,
  signin,
  updateUser,
  addAddress,
  getAllUsers,
  addPaymentMethod
};
