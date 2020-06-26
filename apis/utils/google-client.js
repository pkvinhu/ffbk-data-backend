const { google } = require("googleapis");
let { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../../credentials");
const {
  client_secret,
  client_id,
  client_email,
  private_key,
  redirect_uris
} = require("../../gs-credentials").installed;

let getGoogleClient = async () => {
  var doc = new GoogleSpreadsheet();

  await doc.useServiceAccountAuth(creds);
  const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  auth.setCredentials(doc.jwtClient.credentials);
  return auth;
};

let constructParams = (auth, spreadsheetId, range) => ({
  auth,
  spreadsheetId,
  range
});

module.exports = { getGoogleClient, constructParams };
