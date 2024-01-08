const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

async function userLogin(req, res) {
  
  const user = await User.findOne({ email: req.body.email }).populate("myOrders");
  if (!user) {
    return res.json({ msg: "Wrong credentials" });
  } else if (!(await user.comparePassword(req.body.password))) {
    return res.json("Wrong credentials");
  } else {
    const token = jwt.sign({ sub: user.id, role:"client" }, process.env.JWT_SECRET);
    return res.json({
      token,
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      address: user.address,
      email: user.email,
      phone: user.phone,      
      avatar: user.avatar,
    });
  }
}

async function adminLogin(req, res) {
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    return res.json({ msg: "Wrong credentials" });
  } else if (!(await admin.comparePassword(req.body.password))) {
    return res.json("Wrong credentials");
  } else {
    const token = jwt.sign({ sub: admin.id, role:"admin" }, process.env.JWT_SECRET);
    return res.json({
      token,
      id: admin.id,
      firstname: admin.firstname,
      lastname: admin.lastname,
      email: admin.email,
      avatar:admin.avatar,
    });
  }
}

module.exports = {
  userLogin,
  adminLogin,
};
