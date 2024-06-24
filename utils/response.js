require("dotenv").config();
function ParseResponse(status, message, data) {
  let response = null;
  if (!data) {
    response = {
      api: "event_management_api",
      version: process.env.VERSION,
      status: status,
      message: message,
    };
    return response;
  }
  response = {
    api: "event_management_api",
    version: process.env.VERSION,
    status: status,
    message: message,
    data: data,
  };
  return response;
}

module.exports = ParseResponse;
