const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/watches", require("./watches"));
router.use("/cart", require("./cart"));
router.use("/order", require("./order"));


module.exports = router;