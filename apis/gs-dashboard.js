/* IMPORTED PACKAGES */
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const sheets = google.sheets("v4");

/* HELPERS */
const { getGoogleClient, constructParams } = require("./utils/google-client");
const dash = require("./utils/FFBK_Dashboard");

/* CREDENTIALS */
const { ffbk_db, ffbk_budget, dashboard } = process.env;

router.get('/api/dashboard/monthly-giving', async (req, res) => {
    let auth = await getGoogleClient();
  let involvement = sheets.spreadsheets.values.get(
    constructParams(auth, dashboard, `Monthly Giving!G1:M500`),
    (err, response) => {
      if (err) {
        console.error("monthly giving returned error: ", err);
        return res.status(400).json(err.data);
      }
      let rows = response.data.values || [];
      rows = dash.getMonthlyGiving(rows);
      return res.json(rows);
    }
  );
})

router.get('/api/dashboard/budget-chart', async (req, res) => {
  let auth = await getGoogleClient();
let involvement = sheets.spreadsheets.values.get(
  constructParams(auth, dashboard, `Budget Charts!A2:H26`),
  (err, response) => {
    if (err) {
      console.error("monthly giving returned error: ", err);
      return res.status(400).json(err.data);
    }
    let rows = response.data.values || [];
    rows = dash.getMonthlyGiving(rows);
    return res.json(rows);
  }
);
})

router.get('/api/dashboard/budget-breakdown', async (req, res) => {
  let auth = await getGoogleClient();
let involvement = sheets.spreadsheets.values.get(
  constructParams(auth, dashboard, `Budget Data!A1:E`),
  (err, response) => {
    if (err) {
      console.error("monthly giving returned error: ", err);
      return res.status(400).json(err.data);
    }
    let rows = response.data.values || [];
    rows = dash.getBudgetBreakdown(rows);
    return res.json(rows);
  }
);
})

router.get('/api/dashboard/giving-forecast', async (req, res) => {
  let auth = await getGoogleClient();
let involvement = sheets.spreadsheets.values.get(
  constructParams(auth, dashboard, `Budget Data!K1:P13`),
  (err, response) => {
    if (err) {
      console.error("monthly giving returned error: ", err);
      return res.status(400).json(err.data);
    }
    let rows = response.data.values || [];
    rows = dash.getMonthlyGiving(rows);
    return res.json(rows);
  }
);
})

module.exports = router;