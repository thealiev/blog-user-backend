const axios = require("axios");
const express = require("express");
const router = express.Router();

router.post("/api/create-ticket", async (req, res) => {
  const { user, summary, priority, link, collection } = req.body;

  const jiraPayload = {
    fields: {
      project: {
        key: JIRA_PROJECT_KEY,
      },
      summary: summary,
      description: `Collection: ${collection}\nLink: ${link}`,
      issuetype: {
        name: "Task",
      },
      priority: {
        name: priority,
      },
      reporter: {
        name: user.username,
      },
      labels: ["support_ticket"],
    },
  };

  try {
    const response = await axios.post(
      `${JIRA_DOMAIN}/rest/api/3/issue`,
      jiraPayload,
      {
        auth: {
          username: JIRA_EMAIL,
          password: JIRA_API_TOKEN,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    res.status(201).json({ key: response.data.key });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

module.exports = router;