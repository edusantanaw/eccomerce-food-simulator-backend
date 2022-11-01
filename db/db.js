const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/food")
  .then(() => {
    console.log("connectado com sucesso ao banco de dados!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
