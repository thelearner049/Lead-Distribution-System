const express = require("express");
const { getDashboardData } = require("../controllers/dashboard.controller");
const router = express.Router();

//dashboard routes
router.get("/", getDashboardData);

module.exports = router;
