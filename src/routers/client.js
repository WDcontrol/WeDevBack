const express = require("express");
const Client = require("../models/Client");
const router = express.Router();

router.post("/", async (req, res) => {
  // Create a new client
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).send({ client });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/all", async (req, res) => {
  // Get all
  const clients = await Client.find({});
  res.status(201).send({ clients });
});

module.exports = router;
