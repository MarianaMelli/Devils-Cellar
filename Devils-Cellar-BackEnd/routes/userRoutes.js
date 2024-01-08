const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { expressjwt: checkJwt } = require("express-jwt");
const checkToken = checkJwt({
  secret: process.env.JWT_SECRET,
  algorithms: [process.env.JWT_ALGORITHMS],
});

router.post("/", userController.store);

router.use(checkToken);
router.get("/", userController.index);
router.get("/deleted", userController.findDeleted);
router.get("/:id", userController.show);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);
router.patch("/restore/:id",userController.restore)
module.exports = router;
