const express = require("express");
const router = express.Router();
const resetDBController = require("../controllers/resetDBController");

router.get("/resetdb", resetDBController.resetDB);

module.exports = router;
