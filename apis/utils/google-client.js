const { google } = require("googleapis");
let { GoogleSpreadsheet } = require("google-spreadsheet");
let client_secret;
let client_id;
let redirect_uri;
if(process.env.ENV == "prod") {
  client_secret = process.env.client_secret
  client_id = process.env.client_id2
  redirect_uri = process.env.redirect_uri
} else if(process.env.ENV == "dev") {
  const c = require('../../gs-credentials');
  client_secret = c.client_secret
  client_id = c.client_id
  redirect_uri = c.redirect_uri[0]
}

const credsFromEnv = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key.split('\\n').join('\n'),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url
};
let creds = credsFromEnv;
if(process.env.ENV == "dev") {
  creds = require("../../credentials");
};

let getGoogleClient = async () => {
  console.log(process.env.ENV)
  console.log(creds)
  console.log(require('../../credentials'));
  var doc = new GoogleSpreadsheet();

  await doc.useServiceAccountAuth(creds);
  const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
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
