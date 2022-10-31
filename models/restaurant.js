const mongoose = require("../db/db");
const { Schema } = require("mongoose");

const Restaurant = mongoose.model(
  "Restaurant",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    products: Array,
    createdAr: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  })
);

module.exports = Restaurant;
