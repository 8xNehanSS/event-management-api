const ParseResponse = require("./response");

require("dotenv").config();

function checkAuthorization(req, res, next) {
  const apiKey = req.headers["api-key"];
  if (!apiKey) {
    return res
      .status(401)
      .send(ParseResponse(401, "API Key missing in the header!", null));
  }
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).send(ParseResponse(401, "Not Authorized!", null));
  }
  next();
}

module.exports = checkAuthorization;
