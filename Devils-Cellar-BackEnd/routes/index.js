const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const orderRoutes = require("./orderRoutes");
const mainRoutes = require("./mainRoutes");
module.exports = (app) => {
   
  app.use("/", mainRoutes)
  app.use("/tokens", authRoutes);
  app.use("/products", productRoutes);  
  app.use("/admins", adminRoutes);
  app.use("/login", authRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/users", userRoutes);
  app.use("/orders", orderRoutes);
};

