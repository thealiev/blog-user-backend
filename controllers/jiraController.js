const { createJiraTicket } = require("../utils/jira");

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
    res.status(500).json({ error: "Failed to create Jira ticket" });
  }
};

module.exports = {
  createTicket,
};
