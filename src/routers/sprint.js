const express = require("express");
const { Sprint, Project } = require("../models");
const { auth, checkRights } = require("../middleware");

const router = express.Router();

router.post("/:projectId", auth, checkRights, async (req, res) => {
  // Create a new sprint
  try {
    const sprint = new Sprint(req.body);
    await sprint.save();
    await Project.addSprint(req.params.projectId, sprint);
    res.status(201).send({ sprint });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:projectId/all", auth, checkRights, async (req, res) => {
  // Get all
  const user = req.user;
  const project = await user.projects.filter(project => {
    return project._id == req.params.projectId;
  });
  const sprints = project[0].sprints;
  res.status(201).send({ sprints });
});

router.get("/:projectId/:sprintId", auth, checkRights, async (req, res) => {
  // Details
  const sprintId = req.params.sprintId;
  const sprint = await Sprint.findById({ _id: sprintId });
  res.status(201).send({ sprint });
});

router.post("/:projectId/:sprintId", auth, checkRights, async (req, res) => {
  // Edit
  try {
    const sprintId = req.params.sprintId;
    const sprint = await Sprint.updateOne({ _id: sprintId }, req.body);
    res.status(201).send({ sprint });
  } catch (err) {
    res.status(400).send({ error });
  }
});

module.exports = router;
