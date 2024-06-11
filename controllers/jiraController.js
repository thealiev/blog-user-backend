const Ticket = require("../models/ticket");

const createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket({
      title: req.body.summary,
      description: req.body.priority,
      link: req.body.link,
      collection: req.body.collection,
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: "Error creating ticket: " + err.message });
  }
};

const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.userId });
    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: "Error retrieving tickets: " + err.message });
  }
};

module.exports = {
  createTicket,
  getUserTickets,
};
