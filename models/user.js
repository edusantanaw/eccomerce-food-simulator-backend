const mongoose = require("../db/db");
const { Schema } = require("mongoose");

const User = mongoose.model(
  "User",
  new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
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

    admin: {
      type: Boolean,
      default: false,
    },
    perfilPhoto: String,
    address: {
      street: {
        type: String,
      },
      number: {
        type: Number,
      },
      city: {
        type: String,
      },
      cep: {
        type: Number,
      },
    },
    phoneNumber: {
      type: Number,
    },
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
      default: false,
    },
  })
);

module.exports = User;
