const axios = require("axios");

async function createJiraTicket(user, summary, priority, link, collection) {
  const jiraUrl = `https://${process.env.JIRA_DOMAIN}/rest/api/3/issue`;
  const jiraAuth = Buffer.from(
    `${process.env.JIRA_EMAIL}:${process.env.JIRA_API_TOKEN}`
  ).toString("base64");

  const ticketData = {
    fields: {
      project: {
        key: "KAN",
      },
      summary: summary,
      description: `Collection: ${collection}\nPage Link: ${link}`,
      issuetype: {
        name: "Task", // Replace with the appropriate issue type
      },
      reporter: {
        name: user.username, // Ensure this matches a Jira user
      },
      priority: {
        name: priority,
      },
    },
  };

  try {
    const response = await axios.post(jiraUrl, ticketData, {
      headers: {
        Authorization: `Basic ${jiraAuth}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating Jira ticket:", error.response.data);
    throw error;
  }
}

module.exports = {
  createJiraTicket,
};
