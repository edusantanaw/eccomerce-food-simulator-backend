const { existsOrError, validId } = require("../../helpers/existsOrError");
const Products = require("../../models/products");

const registerProduct = async (req, res) => {
  const { name, category, price, description } = req.body;
  const image = req.files;

  try {
    existsOrError(name, "O nome do produto é necessario!");
    existsOrError(category, "A categoria do produto é necessaria!");
    existsOrError(price, "O preço do produto é necessario!");
    existsOrError(image, "A imagem do produto é necessaria!");
    existsOrError(description, "A descrição do produto é necessaria!");

    const existsProduct = await Products.findOne({ name: name });
    if (existsProduct) throw "Este produto já está cadastrado no sistema !";
    let off = 0;

    switch (category) {
      case "hamburder": {
        off = 0.2;
        break
      }
      case "pizza": {
        off = 0.4;
        break
      }
      case "cake": {
        off = 0.1;
        break
      }
      default:
        off = 0;
    }
    console.log(off)
    const newProduct = new Products({
      name,
      category,
      price,
      image,
      description,
      off,
    });

    await newProduct.save();

    res.status(200).send("Produto cadastrado com sucesso!");
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products || products.length === 0) throw "Nenhum produto encontrado !";

    res.status(200).send(products);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    validId(id);
    const product = await Products.findOne({ _id: id });
    if (!product) throw "Nenhum produto encontrado!";

    res.status(200).send([product]);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const editProduct = async (req, res) => {
  const id = req.params.id;

  const { name, category, price, description, available } = req.body;
  const image = req.files;
  try {
    validId(id);
    if (!req.body || req.body == null) throw "Nenhum dado atualizado!";
    const product = await Products.findOne({ id: id });
    if (!product) throw "Nenhum produto encontrado!";

    if (name) {
      const existsName = await Products.find({ name: name });
      console.log(existsName);
      if (existsName.length > 0)
        throw "Este nome de produto já está sendo usado!";
      product.name = name;
    }

    if (category) product.category = category;
    if (price) product.price = price;
    if (description) product.description = description;
    if (image) product.image = image;
    if (available) product.available = available;
    await Products.findOneAndUpdate(
      { _id: product._id },
      { $set: product },
      { new: true }
    );

    res.status(200).send("Produto atualizado com sucesso!");
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const removeProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    validId(productId);
    const product = await Products.findOne({ _id: id });
    if (!product) throw "Produto não encontrado!";

    await Products.findOneAndDelete({ _id: product._id });
    res.status(201).send("Produto deletado com sucesso!");
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

const filteByCategory = async (req, res) => {
  const category = req.params.category;
  const products = await Products.find({ category: category });
  if (!products || products.length === 0)
    return res.status(401).send({ error: "Nenhum produto encontrado!" });
  res.status(200).send(products);
};

const getDeals = async (req, res) => {
  try {
    const deals = await Products.find().where("off").gt(0);
    if (!deals) throw "Nenhuma promoção encontrada!";
    res.status(200).send(deals);
  } catch (error) {
    res.status(401).send({ error: error });
  }
};

module.exports = {
  registerProduct,
  getAllProducts,
  getProductById,
  editProduct,
  removeProduct,
  getDeals,
  filteByCategory,
};
