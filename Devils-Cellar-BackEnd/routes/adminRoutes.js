const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { expressjwt: checkJwt } = require("express-jwt");
const checkToken = checkJwt({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_ALGORITHMS]});



router.use(checkToken)
router.get("/", adminController.index);
router.get("/:id", adminController.show);
router.post("/", adminController.store);
router.patch("/:id", adminController.update);
router.delete("/:id", adminController.destroy);

module.exports = router;
