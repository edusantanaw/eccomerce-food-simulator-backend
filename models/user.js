const mongoose = require("../db/db");
const { Schema } = require("mongoose");

const User = mongoose.model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    restaurant: {
      type: String,
    },
    perfilPhoto: String,
    paymentMethods: Object,
    createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updated: {
      type: Date,
      default: () => Date.now(),
      immutable: false,
    },
    deletedAt: {
        type: Boolean,
        default: false
    }
  })
);

module.exports = User;
