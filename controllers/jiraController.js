// jiraControllers.js
const { getJiraUserTickets } = require("../utils/jira");

const createTicket = async (req, res) => {
  const { user, summary, priority, link, collection } = req.body;

  try {
    const ticket = await createJiraTicket(
      user,
      summary,
      priority,
      link,
      collection
    );
    res.json(ticket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Failed to create Jira ticket" });
  }
};

const getUserTickets = async (req, res) => {
  const { user } = req.body;

  try {
    const tickets = await getJiraUserTickets(user);
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching user's tickets:", error);
    res.status(500).json({ error: "Failed to fetch user's tickets" });
  }
};

module.exports = {
  createTicket,
  getUserTickets,
};
