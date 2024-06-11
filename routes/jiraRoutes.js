const express = require("express");
const router = express.Router();
const { createTicket, getUserTickets } = require("../controllers/jiraController");

router.post("/api/create-ticket", createTicket);

router.get("/api/user-tickets", getUserTickets);

module.exports = router;
