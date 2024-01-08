const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { expressjwt: checkJwt } = require("express-jwt");
const checkToken = checkJwt({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_ALGORITHMS]});

router.use(checkToken)
router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post("/", orderController.store);
router.patch("/:id", orderController.update);


module.exports = router;
