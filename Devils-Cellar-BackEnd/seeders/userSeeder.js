const User = require("../models/User");
const bcrypt = require("bcryptjs");
module.exports = async () => {
  const userList = [];
  const hashedPassword = await bcrypt.hash("1234", 10);

  const user = new User({
    firstname: "User",
    lastname: "Test",
    address: "Montevideo 2564",
    email: "user@test.com",
    phone: "099123456",
    password: hashedPassword,
    myOrders: [],
  });

  userList.push(user);

  const user1 = new User({
    firstname: "Juana",
    lastname: "López",
    address: "Salvador 2564",
    email: "juanal@gmail.com",
    phone: "099789456",
    password: hashedPassword,
    myOrders: [],
  });

  userList.push(user1);

  const user2 = new User({
    firstname: "Juan",
    lastname: "Gómez",
    address: "Yi 2586",
    email: "juangomez@gmail.com",
    phone: "097321569",
    password: hashedPassword,
    myOrders: [],
  });

  userList.push(user2);

  await User.insertMany(userList);
  console.log("[Database] Se corrió el seeder de Users.");
};
