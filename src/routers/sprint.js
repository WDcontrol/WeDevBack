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
  try {
    const user = req.user;
    const projectId = req.params.projectId;
    const isUserInProject = await Sprint.isUserInProject(user, projectId);
    if (!isUserInProject) {
      throw new Error("Can't access this project");
    }
    const sprints = await Sprint.find({ project: projectId });
    res.status(201).send({ sprints });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/details/:id", auth, async (req, res) => {
  // Show details
  try {
    const id = req.params.id;
    const user = req.user;
    const sprint = await Sprint.find({ _id: id });
    const projectId = sprint.project;
    if (sprint.length == 0) {
      throw new Error("Can't find this sprint");
    }
    const isUserInProject = await Sprint.isUserInProject(user, projectId);
    if (!isUserInProject) {
      throw new Error("Can't access this sprint");
    }

    res.status(201).send({ sprint });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/edit/:id", auth, async (req, res) => {
  // Edit
  try {
    const id = req.params.id;
    const user = req.user;
    const sprint = await Sprint.find({ _id: id });
    const projectId = sprint.project;
    if (sprint.length == 0) {
      throw new Error("Can't find this sprint");
    }
    const isUserInProject = await Sprint.isUserInProject(user, projectId);
    if (!isUserInProject) {
      throw new Error("Can't access this sprint");
    }

    res.status(201).send({ sprint });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
