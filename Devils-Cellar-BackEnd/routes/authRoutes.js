
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.post("/user", authController.userLogin);
router.post("/admin", authController.adminLogin);

module.exports = router;
