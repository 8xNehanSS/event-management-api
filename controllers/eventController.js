const db = require("../database/database");
const logError = require("../utils/logger");
const ParseResponse = require("../utils/response");
const Joi = require("joi");

const eventSchema = Joi.object({
  name: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  venue: Joi.string().min(1).required(),
  date: Joi.date().iso().required(),
});

const attendeeSchema = Joi.object({
  firstname: Joi.string().min(1).required(),
  lastname: Joi.string().min(1).required(),
  contact: Joi.string().min(1).required(),
});

function validateSchema(req, res, schema) {
  const { error } = schema.validate(req.body);
  if (error) {
    return error.message;
  }
}

function addEvent(req, res) {
  try {
    let err = validateSchema(req, res, eventSchema);
    if (err) {
      return res.status(400).send(ParseResponse(400, err, null));
    }
    const { name, description, venue, date } = req.body;
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
    logError(error);
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
    const eventID = parseInt(req.params.eventID);
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
    logError(error);
    res.status(400).send(ParseResponse(400, error.message, null));
  }
}

function updateEvent(req, res) {
  try {
    let err = validateSchema(req, res, eventSchema);
    if (err) {
      return res.status(400).send(ParseResponse(400, err, null));
    }
    const eventID = parseInt(req.params.eventID);
    const { name, description, venue, date } = req.body;
    db.run(
      "UPDATE events SET name=?, description=?, venue=?, date=? WHERE id=?",
      [name, description, venue, date, eventID],
      function (err) {
        if (err) {
          return res
            .status(400)
            .send(ParseResponse(400, "Error updating database", null));
        }
        if (this.changes === 0) {
          return res
            .status(404)
            .send(ParseResponse(404, "Event not found", null));
        }
        res.send(
          ParseResponse(200, "Success", {
            id: eventID,
            name,
            description,
            venue,
            date,
          })
        );
      }
    );
  } catch (error) {
    logError(error);
    res.status(400).send(ParseResponse(400, error.message, null));
  }
}

function deleteEvent(req, res) {
  try {
    const eventID = parseInt(req.params.eventID);
    db.all("DELETE FROM events WHERE id=?", [eventID], function (err, rows) {
      if (err) {
        res.status(500).send(ParseResponse(500, err.message, null));
      }
      if (this.changes === 0) {
        return res
          .status(404)
          .send(ParseResponse(404, "Event not found", null));
      }
      res.status(200).send(ParseResponse(200, "Success", rows[0]));
    });
  } catch (error) {
    logError(error);
    res.status(400).send(ParseResponse(400, error.message, null));
  }
}

function addAttendee(req, res) {
  try {
    let err = validateSchema(req, res, attendeeSchema);
    if (err) {
      return res.status(400).send(ParseResponse(400, err, null));
    }
    const { firstname, lastname, contact } = req.body;
    const eventID = parseInt(req.params.eventID);
    db.run(
      "INSERT INTO attendees (firstname, lastname, contact, event_id) VALUES (?, ?, ?, ?)",
      [firstname, lastname, contact, eventID],
      function (err) {
        if (err) {
          return res
            .status(400)
            .send(ParseResponse(400, "Error adding to database", null));
        }
        res.send(
          ParseResponse(200, "Success", {
            id: this.lastID,
            firstname,
            lastname,
            contact,
            eventID,
          })
        );
      }
    );
  } catch (error) {
    logError(error);
    res.status(400).send(ParseResponse(400, error.message, null));
  }
}

function removeAttendee(req, res) {
  try {
    const attendeeID = parseInt(req.params.attendeeID);
    db.all(
      "DELETE FROM attendees WHERE id=?",
      [attendeeID],
      function (err, rows) {
        if (err) {
          res.status(500).send(ParseResponse(500, err.message, null));
        }
        if (this.changes === 0) {
          return res
            .status(404)
            .send(ParseResponse(404, "Attendee not found", null));
        }
        res.status(200).send(ParseResponse(200, "Success", rows[0]));
      }
    );
  } catch (error) {
    logError(error);
    res.status(400).send(ParseResponse(400, error.message, null));
  }
}

function getEventAttendees(req, res) {
  try {
    const eventID = parseInt(req.params.eventID);
    db.all(
      "SELECT * FROM attendees WHERE event_id=?",
      [eventID],
      function (err, rows) {
        if (err) {
          res.status(500).send(ParseResponse(500, err.message, null));
        }
        if (rows.length === 0) {
          return res
            .status(404)
            .send(
              ParseResponse(404, "Event not found or zero attendees", null)
            );
        }
        res.status(200).send(ParseResponse(200, "Success", rows));
      }
    );
  } catch (error) {
    logError(error);
    res.status(400).send(ParseResponse(400, error.message, null));
  }
}

// function addTests(req, res) {
//   //running a .sql file to populate the database with test data
//   const fs = require("fs");
//   const path = require("path");
//   const sql = fs
//     .readFileSync(path.join(__dirname, "../database/testdata.sql"))
//     .toString();
//   db.exec(sql, function (err) {
//     if (err) {
//       return res
//         .status(400)
//         .send(ParseResponse(400, "Error adding test data", null));
//     }
//     res.send(ParseResponse(200, "Success", null));
//   });
// }

module.exports = {
  addEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  addAttendee,
  removeAttendee,
  getEventAttendees,
  // addTests,
};
