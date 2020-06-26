require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const { givingRouter, dashboardRouter } = require('./apis');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/giving', givingRouter);
app.use('/api/dashboard', dashboardRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
})
