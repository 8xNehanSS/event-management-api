const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/", eventController.addEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.post("/:id/attendee", eventController.addAttendee);
router.delete("/:id/attendee", eventController.removeAttendee);
router.get("/:id/attendees", eventController.getEventAttendees);

module.exports = router;
