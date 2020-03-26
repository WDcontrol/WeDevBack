const express = require("express");
const { Task, Sprint } = require("../models");
const { auth, checkRights } = require("../middleware");

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

router.get("/:projectId/:sprintId/all", auth, checkRights, async (req, res) => {
  // Read all
  const user = req.user;
  const project = user.projects.filter(project => {
    return project._id == req.params.projectId;
  });
  const sprints = project[0].sprints.filter(sprint => {
    return sprint._id == req.params.sprintId;
  });
  const tasks = sprints[0].tasks;

  res.status(201).send({ tasks });
});

router.get(
  "/:projectId/:sprintId/:taskId",
  auth,
  checkRights,
  async (req, res) => {
    // Read one
    const taskId = req.params.taskId;
    const task = await Task.findById({ _id: taskId });
    res.status(201).send({ task });
  }
);

router.post(
  "/:projectId/:sprintId/:taskId",
  auth,
  checkRights,
  async (req, res) => {
    // Edit
    try {
      const taskId = req.params.taskId;
      const task = await Task.updateOne({ _id: taskId }, req.body);
      res.status(201).send({ task });
    } catch (err) {
      res.status(400).send({ error });
    }
  }
);

module.exports = router;
