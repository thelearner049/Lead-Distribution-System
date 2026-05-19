const express = require("express");
const cors = require("cors");
const providerModel = require("./models/provider.model");
const leadRoutes = require("./routes/lead.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const webhookRoutes = require("./routes/webhook.routes");
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/webhook", webhookRoutes);

module.exports = app;
