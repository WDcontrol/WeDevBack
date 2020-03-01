const express = require("express");
const Client = require("../models/Client");
const router = express.Router();

router.post("/", async (req, res) => {
  // Create a new client
  try {
    console.log(req.body);
    const client = new Client(req.body);
    await client.save();
    res.status(201).send({ client });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
