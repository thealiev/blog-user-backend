const express = require("express");
const router = express.Router();
const jiraController = require("../controllers/jiraController");

router.post("/create-ticket", jiraController.createTicket);

router.get("/user-tickets", jiraController.getUserTickets);

module.exports = router;
