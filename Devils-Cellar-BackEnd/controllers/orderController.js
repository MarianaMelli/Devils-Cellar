const Order = require("../models/Order");
const User = require("../models/User");

async function index(req, res) {
  try {
    const user = await User.findById(req.auth.sub);

    let filterCriteria = {};
    if (req.auth.role === "client") {
      filterCriteria = { user };
    }

    const orders = await Order.find(filterCriteria)
      .sort({ createdAt: -1 })

      .populate({
        path: "productList",
        populate: { path: "product" },
      });
    for (const order of orders) {
      const user = await User.findById(order.user);
      if (user) {
        order.user = user;
      }
    }
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function show(req, res) {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate({ path: "productList", populate: { path: "product" } });

    return res.json(order);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function store(req, res) {
  const user = await User.findById(req.auth.sub);

  const { productList, paymentMethod, shippingAddress, shippingDate } = req.body;
  try {
    const newOrder = await Order.create({
      user,
      productList,
      paymentMethod,
      shippingAddress,
      shippingDate,
    });
    user.myOrders.push(newOrder);
    user.save();
    return res.status(200).json(newOrder);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function update(req, res) {
  try {
    const updatedOrderStatus = await Order.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });

    await updatedOrderStatus.save();
    return res.status(200).json(updatedOrderStatus);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
};
