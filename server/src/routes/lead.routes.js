const express = require("express");
const { createLead } = require("../controllers/lead.controller");
const router = express.Router();

//lead routes
router.post("/", createLead);

module.exports = router;
