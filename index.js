//imports
const ParseResponse = require("./utils/response");
const express = require("express");
require("dotenv").config();

//var declarations
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/api/", (req, res) => {
  res.send(ParseResponse(200, "Event Management Service is running", null));
});

const eventRoutes = require("./routes/event");
app.use("/api/v1/event", eventRoutes);

app.listen(port, () => {
  console.log(`Service started on ${port} at ${new Date()}`);
});
