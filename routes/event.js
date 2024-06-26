const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/", eventController.addEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.post("/:id/attendee", eventController.addAttendee);

module.exports = router;
