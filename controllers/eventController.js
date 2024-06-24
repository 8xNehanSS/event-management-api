const db = require("../database/database");
const ParseResponse = require("../utils/response");
const Joi = require("joi");

module.exports = {
  addEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  addAttendee,
  removeAttendee,
  getEventAttendees,
};

const eventSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  venue: Joi.string().min(1).required(),
  date: Joi.date().iso().required(),
});

function addEvent(req, res) {
  try {
    const { error } = eventSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .send(ParseResponse(400, error.details[0].message, null));
    }
    const [name, description, venue, date] = req.body;
    db.run(
      "INSERT INTO events (name, description, venue, date) VALUES (?, ?, ?, ?)",
      [name, description, venue, date],
      function (err) {
        if (err) {
          return res
            .status(400)
            .send(ParseResponse(400, "Error adding to database", null));
        }
        res.send(
          ParseResponse(200, "Success", {
            id: this.lastID,
            name,
            description,
            venue,
            date,
          })
        );
      }
    );
  } catch (error) {
    res.status(400).send(ParseResponse(400, error.message, null));
  }
}

function getEvents(req, res) {
  db.all("SELECT * FROM events", [], (err, rows) => {
    if (err) {
      res.send(ParseResponse(400, err.message, null));
      return;
    }
    res.send(ParseResponse(200, "Success", rows));
  });
}

function getEvent(req, res) {
  try {
    const eventID = parseInt(req.params.id);
    db.all("SELECT * FROM events WHERE id=?", [eventID], function (err, rows) {
      if (err) {
        res.status(500).send(ParseResponse(500, err.message, null));
      }
      if (rows.length === 0) {
        return res
          .status(404)
          .send(ParseResponse(404, "Event not found", null));
      }
      res.status(200).send(ParseResponse(200, "Success", rows[0]));
    });
  } catch (error) {
    res.status(400).send(ParseResponse(400, error.message, null));
  }
}

function updateEvent(req, res) {}

function deleteEvent(req, res) {}

function addAttendee(req, res) {}

function removeAttendee(req, res) {}

function getEventAttendees(req, res) {}
