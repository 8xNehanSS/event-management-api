const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const checkAuthorization = require("../utils/authentication");

router.post("/add-event", checkAuthorization, eventController.addEvent);
router.get("/get-all-events", checkAuthorization, eventController.getEvents);
router.get("/get-event/:eventID", checkAuthorization, eventController.getEvent);
router.put(
  "/update-event/:eventID",
  checkAuthorization,
  eventController.updateEvent
);
router.delete(
  "/delete-event/:eventID",
  checkAuthorization,
  eventController.deleteEvent
);

router.post(
  "/add-attendee/:eventID",
  checkAuthorization,
  eventController.addAttendee
);
router.delete(
  "/remove-attendee/:attendeeID",
  checkAuthorization,
  eventController.removeAttendee
);
router.get(
  "/get-attendees/:eventID",
  checkAuthorization,
  eventController.getEventAttendees
);

// router.get("/test", eventController.addTests);

module.exports = router;
