const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { expressjwt: checkJwt } = require("express-jwt");
const checkToken = checkJwt({ secret: process.env.JWT_SECRET, algorithms: [process.env.JWT_ALGORITHMS]});


router.get("/", productController.index);
router.get("/featured", productController.showFeaturedProducts);
router.get("/:id", productController.show);

router.use(checkToken)
router.post("/", productController.store);
router.patch("/:id", productController.update);
router.delete("/:id", productController.destroy);



module.exports = router;
