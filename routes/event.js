const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.post("/", eventController.addEvent);
router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEvent);
// router.put("/:id", itemController.updateItem);
// router.delete("/:id", itemController.deleteItem);

module.exports = router;
