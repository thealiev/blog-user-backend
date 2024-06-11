
const express = require("express");
const { getJiraUserTickets } = require("../utils/jira");
const router = express.Router();

router.get("/jira-user-tickets", async (req, res) => {
  try {
    const user = req.query.username;
    const tickets = await getJiraUserTickets(user);
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching Jira user tickets:", error);
    res.status(500).json({ message: "Failed to fetch Jira user tickets" });
  }
});

module.exports = router;
