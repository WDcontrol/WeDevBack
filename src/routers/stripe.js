const express = require("express");

const stripe = require("stripe")("sk_test_rCmXib3tVkLG8abCd8UlkNBR00HsnwkALn");
const router = express.Router();

router.post("/:projectId/:sprintId", auth, checkRights, async (req, res) => {
  // Create
  try {
    const task = new Task(req.body);
    await task.save();
    await Sprint.addTask(req.params.sprintId, task);
    res.status(201).send({ task });
  } catch (error) {
    res.status(400).send(error);
  }
});
