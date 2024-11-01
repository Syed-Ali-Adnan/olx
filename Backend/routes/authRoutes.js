const express = require('express')

const {login , signup ,updateProfile } = require("../Controller/authController");

const router = express.Router();
router.post("/login",login);
router.post("/signup",signup);
router.post("/update-Profile",updateProfile)

module.exports= router