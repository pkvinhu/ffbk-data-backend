require("dotenv").config();
const express = require('express');
const app = express();
const serverless = require('serverless-http');
const port = process.env.PORT;
const cors = require('cors');
const { givingRouter, dashboardRouter } = require('./apis');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/.netlify/functions/api/giving', givingRouter);
app.use('/.netlify/functions/api/dashboard', dashboardRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})

module.exports.handler = serverless(app);
