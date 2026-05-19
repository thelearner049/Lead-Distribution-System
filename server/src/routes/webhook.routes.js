const express = require("express")
const { resetQuotaWebhook } = require("../controllers/webhook.controller")
const router = express.Router()

//webhook reset route
router.post("/reset-quota", resetQuotaWebhook)

module.exports = router
