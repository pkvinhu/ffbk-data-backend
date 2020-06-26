require("dotenv").config();
/* IMPORTED PACKAGES */
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const sheets = google.sheets("v4");
const rp = require("request-promise");
let { GoogleSpreadsheet } = require("google-spreadsheet");

/* HELPERS */
const { getGoogleClient, constructParams } = require("./utils/google-client");
const giving = require("./utils/FFBK_DB_Giving");

/* CREDENTIALS */
const creds = require("../credentials");
const { ffbk_database_giving, ffbk_db, ffbk_budget } = process.env;

router.get("/status/percentages", async (req, res, next) => {
  /* 
    for github reference to google-spreadsheet pkg: 
    visit https://github.com/theoephraim/node-google-spreadsheet 
  */
  let auth = await getGoogleClient();
  sheets.spreadsheets.values.get(
    constructParams(auth, ffbk_database_giving, `Dashboard!A4:I12`),
    (err, response) => {
      if (err) {
        console.error("statuses return error: ", err);
        return res.status(400).json(err.data);
      }
      let rows = response.data.values || [];
      rows = giving.getStatus(rows);
      return res.json(rows);
    }
  );
});

router.get("/involvement/percentages", async (req, res) => {
  let auth = await getGoogleClient();
  let involvement = sheets.spreadsheets.values.get(
    constructParams(auth, ffbk_database_giving, `Dashboard!A15:I19`),
    (err, response) => {
      if (err) {
        console.error("involvement returned error: ", err);
        return res.status(400).json(err.data);
      }
      let rows = response.data.values || [];
      rows = giving.getInvolvement(rows);
      return res.json(rows);
    }
  );
});

router.get("/:range/search?", async (req, res, next) => {
  let { range } = req.params;
  let { sheet } = req.query;
  console.log(range, sheet);
  if (!range) range = "G1:I37";
  if (!sheet) sheet = "Budget Data";
  let auth = await getGoogleClient();
  sheets.spreadsheets.values.get(
    constructParams(auth, ffbk_database_giving, `${sheet}!${range}`),
    (err, apiRes) => {
      if (err) {
        console.error("The API returned an error.", err);
        return res.status(400).json(err.data);
      }
      let rows = apiRes.data.values || [];
      //console.log(giving.sortMasterSheet(rows))
      rows = giving.sortMasterSheet(rows);
      return res.json(rows);
    }
  );
});

module.exports = router;
