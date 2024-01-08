require("dotenv").config();
const orderModel = require("../models/Order");
const adminModel = require("../models/Admin");
const productModel = require("../models/Product");
const categoryModel = require("../models/Category")
const userModel = require("../models/User");
module.exports = async function runAllSeeders() {
  
  const { mongoose } = require("../db");
  

  // Seeders:

  await orderModel.collection.drop((err) => console.log(err));
  await adminModel.collection.drop((err) => console.log(err));
  await productModel.collection.drop((err) => console.log(err));
  await categoryModel.collection.drop((err)=> console.log(err));
  await userModel.collection.drop((err) => console.log(err));

  await require("./userSeeder")();
  await require("./productSeeder")();
  await require("./adminSeeder")();
  await require("./orderSeeder")();
  

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  mongoose.connection.close();
  process.exit();
};


