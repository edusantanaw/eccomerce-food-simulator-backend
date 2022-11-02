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
    restaurant: {
      type: String,
    },
    perfilPhoto: String,
    paymentMethods: {
      name: {
        type: String,
        required: true
      },
      cardNumber: {
        type: Number,
        required: true
      },
      cvv: {
        type: Number,
        required:true
      },
      date: {
        type: Date,
        required: true
      }
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      cep: {
        type: Number,
        required: true,
      },
    },
    phoneNumber: {
      type: Number,
      required: true,
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
