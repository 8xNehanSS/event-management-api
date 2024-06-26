const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/add-event", eventController.addEvent);
router.get("/get-all-events", eventController.getEvents);
router.get("/get-event/:eventID", eventController.getEvent);
router.put("/update-event/:eventID", eventController.updateEvent);
router.delete("/delete-event/:eventID", eventController.deleteEvent);

router.post("/add-attendee/:eventID", eventController.addAttendee);
router.delete("/remove-attendee/:attendeeID", eventController.removeAttendee);
router.get("/get-attendees/:eventID", eventController.getEventAttendees);

// router.get("/test", eventController.addTests);

module.exports = router;
