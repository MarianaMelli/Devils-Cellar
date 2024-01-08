const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
module.exports = async () => {
  const adminList = [];
  const hashedPassword = await bcrypt.hash("1234", 10);

  const admin = new Admin({
    firstname: "Admin",
    lastname: "Test",
    email: "admin@test.com",
    password: hashedPassword,
  });

  adminList.push(admin);

  const admin1 = new Admin({
    firstname: "Maria",
    lastname: "Gregorio",
    email: "mariag@gmail.com",
    password: hashedPassword,
  });

  adminList.push(admin1);

  const admin2 = new Admin({
    firstname: "Pedro",
    lastname: "Sanchez",
    email: "pedros@gmail.com",
    password: hashedPassword,
  });

  adminList.push(admin2);

  await Admin.insertMany(adminList);
  console.log("[Database] Se corrió el seeder de Admins.");
};
