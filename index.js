//imports
const ParseResponse = require("./utils/response");
const express = require("express");
require("dotenv").config();
const figlet = require("figlet");
const logError = require("./utils/logger");

//var declarations
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/api/", (req, res) => {
  res.send(ParseResponse(200, "Event Management Service is running", null));
});

const eventRoutes = require("./routes/event");
app.use("/api/v1/events", eventRoutes);

app.listen(port, async () => {
  const chalk = await import("chalk");
  figlet("E.M. API", (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      logError(err);
      return;
    }

    console.log(chalk.default.green(data));
    console.log(chalk.default.blue(`Service started on port ${port}`));
    console.log(
      chalk.default.yellow(`Startup time: ${new Date().toLocaleString()}`)
    );
    console.log(chalk.default.green("Ready to handle requests..."));
  });
});
