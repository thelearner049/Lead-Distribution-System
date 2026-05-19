const providerModel = require("../models/provider.model");
const webhookLogModel = require("../models/webhookLog.model");

async function resetQuotaWebhook(req, res) {
  try {
    const { webhookId } = req.body;

    const isExsistingWebhook = await webhookLogModel.findOne({ webhookId });
    console.log(isExsistingWebhook);
    if (isExsistingWebhook) {
      return res.status(200).json({
        success: true,
        message: "Webhook already processed.",
      });
    }

    await providerModel.updateMany({}, { usedQuota: 0 });

    const createdWebhook = await webhookLogModel.create({ webhookId });
    console.log(createdWebhook);

    res.status(200).json({
      success: true,
      message: "Provider quotas reset successfully",
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
}

module.exports = { resetQuotaWebhook };
