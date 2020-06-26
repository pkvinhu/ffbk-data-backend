require("dotenv").config();
const express = require('express');
const app = express();
const serverless = require('serverless-http');
const path = require('path');
const cors = require('cors');
const { givingRouter, dashboardRouter } = require('../apis');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', givingRouter);
app.use('/', dashboardRouter)
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

module.exports = app;
module.exports.handler = serverless(app);
