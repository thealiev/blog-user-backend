const axios = require("axios");

const getJiraUserTickets = async (user) => {
  const response = await axios.get(
    `${process.env.JIRA_DOMAIN}/rest/api/3/user?username=${user.username}`,
    {
      auth: {
        username: process.env.JIRA_EMAIL,
        password: process.env.JIRA_API_TOKEN,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};

module.exports = {
  getJiraUserTickets,
};
