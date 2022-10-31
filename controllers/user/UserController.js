const createUserToken = require("../../helpers/createToken");
const { existsOrError } = require("../../helpers/existsOrError");
const User = require("../../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req;

  try {
    existsOrError(name, "O nome é necessario!");
    existsOrError(email, "O email é necessario!");
    existsOrError(password, "A senha é necessaria!");

    existsOrError(confirmPassword, "A confirmarção d2e senha é necessaria!");
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) throw "Este email ja está sendo usado!";

    if (password !== confirmPassword) throw "A senhas devem ser iguais!";
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
console.log(email, password)
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

module.exports = { createUser, signin };
