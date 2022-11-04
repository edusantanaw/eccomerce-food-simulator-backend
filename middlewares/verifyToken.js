const jwt = require("jsonwebtoken");
const getToken = require("../helpers/getToken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send("Acesso negado!");
  const token = getToken(req);
  if (!token) return res.status(401).send("Acesso negado!");
  try {
    const verified = jwt.verify(token, "edu");
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).send("Token Invalido!");
  }
};

module.exports = verifyToken;
