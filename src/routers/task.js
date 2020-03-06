const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");
const Sprint = require("../models/Sprint");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  // Create a new task
  try {
    const user = req.user;
    const sprintId = req.body.sprint;
    const projectId = await Sprint.findOne({ _id: sprintId });
    const isUserInProject = await Task.isUserInProject(
      user,
      projectId._id,
      res
    );
    if (isUserInProject) {
      const task = new Task(req.body);
      await task.save();
      res.status(201).send({ task });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:sprintId/all", auth, async (req, res) => {
  // Get all tasks
  const user = req.user;
  const sprintId = req.params.sprintId;
  const projectId = await Sprint.findOne({ _id: sprintId });
  const isUserInProject = await Task.isUserInProject(user, projectId._id, res);
  if (isUserInProject) {
    const tasks = await Task.find({ sprint: sprintId });
    res.status(201).send({ tasks });
  }
});
router.get("/details/:id", auth, async (req, res) => {
  // Show details
  const user = req.user;
  const id = req.params.id;
  const sprintId = await Task.findOne({ _id: id });
  const projectId = await Sprint.findOne({ _id: sprintId });
  const isUserInProject = await Sprint.isUserInProject(user, projectId, res);
  if (isUserInProject) {
    res.status(201).send({ sprint });
  }
});

module.exports = router;
