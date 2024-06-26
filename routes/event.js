const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/add-event", eventController.addEvent);
router.get("/get-all-events", eventController.getEvents);
router.get("/get-event/:id", eventController.getEvent);
router.put("/update-event/:id", eventController.updateEvent);
router.delete("/delete-event/:id", eventController.deleteEvent);
router.post("/add-attendee/:id", eventController.addAttendee);
router.delete("/remove-attendee/:id", eventController.removeAttendee);
router.get("/get-attendees/:id", eventController.getEventAttendees);

// router.get("/test", eventController.addTests);

module.exports = router;
