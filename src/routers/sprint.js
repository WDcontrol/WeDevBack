const express = require("express");
const Sprint = require("../models/Sprint");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  // Create a new sprint
  try {
    const user = req.user;
    const projectId = req.body.project;
    const isUserInProject = await Sprint.isUserInProject(user, projectId);
    if (!isUserInProject) {
      throw new Error("Can't access this project");
    }
    const sprint = new Sprint(req.body);
    await sprint.save();
    res.status(201).send({ sprint });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:projectId/all", auth, async (req, res) => {
  // get all projects

  const user = req.user;
  const projectId = req.params.projectId;
  const isUserInProject = await Sprint.isUserInProject(user, projectId, res);
  if (isUserInProject) {
    const sprints = await Sprint.find({ project: projectId });
    res.status(201).send({ sprints });
  }
});

router.get("/details/:id", auth, async (req, res) => {
  // Show details
  const user = req.user;
  const id = req.params.id;
  const sprint = await Sprint.findById({ _id: id });
  const projectId = sprint.project;
  const isUserInProject = await Sprint.isUserInProject(user, projectId, res);
  if (isUserInProject) {
    res.status(201).send({ sprint });
  }
});

router.post("/edit/:id", auth, async (req, res) => {
  // Edit
  try {
    const user = req.user;
    const id = req.params.id;
    let sprint = await Sprint.findById({ _id: id });
    const projectId = sprint.project;
    const isUserInProject = await Sprint.isUserInProject(user, projectId, res);
    if (isUserInProject) {
      sprint = await Sprint.updateOne({ _id: id }, req.body);
      res.status(201).send({ sprint });
    }
  } catch (err) {
    res.status(400).send({ error: "" });
  }
});

module.exports = router;
