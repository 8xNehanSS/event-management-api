const fs = require("fs");

function logError(error) {
  const logMessage = `[${new Date().toISOString()}] ERROR: ${error}\n`;

  fs.appendFile("../logs/error.log", logMessage, (err) => {
    if (err) {
      console.error("Failed to write to error.log:", err);
    }
  });
}

module.exports = logError;
