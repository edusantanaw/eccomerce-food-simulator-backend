const mongoose = require("../db/db");
const { Schema } = require("mongoose");

const Products = mongoose.model(
  "Products",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    promotion: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required:true
    },
    image: {
        type: Object,
        required: true
    },
    off: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    createAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    },
    updated: {
      type: Date,
      default: () => Date.now(),
    },
  })
);

module.exports = Products;
