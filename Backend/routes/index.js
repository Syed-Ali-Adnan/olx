const express = require('express')
const authRoute = require("./authRoutes");
const addsRoute = require("./addsRoutes")

const router =express.Router();

router.use("/auth",authRoute);
router.use("/adds",addsRoute);

module.exports = router;