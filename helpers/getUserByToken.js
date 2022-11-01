const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getUserByToken = async (token) => {
  if (!token) return res.status(401).send("Acesso negado!");
  const decoded = jwt.verify(token, "edu");
  const userId = decoded.id;
  const user = await User.findOne({ _id: userId });
  return user;
};

module.exports = getUserByToken;
