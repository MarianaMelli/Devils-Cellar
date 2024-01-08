const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const _ = require("lodash");
module.exports = async () => {
  const orderList = [];
  let users = await User.find();
  let products = await Product.find();

  for (const user of users) {
    let product = products[_.random(0, products.length - 1)];
    const order = new Order({
      user: user.id,
      productList: [{id:product.id, name:product.name, img:product.img, unitPrice: product.unitPrice,stock:product.stock, qty: 4 }],
      status: "paid",   
      paymentMethod:"Visa",   
      shippingAddress: user.address,
      shippingDate: new Date(),
    });
    user.myOrders.push(order);
    await user.save();
    orderList.push(order);
  }

  await Order.insertMany(orderList);
  console.log("[Database] Se corrió el seeder de Orders.");
};
