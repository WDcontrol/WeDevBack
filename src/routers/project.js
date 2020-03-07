const express = require("express");
const Project = require("../models/Project");
const User = require("../models/User");
const { auth, checkRights } = require("../middleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  // Create
  try {
    const project = new Project(req.body);
    await project.save();
    const user = await User.addProject(req.user._id, project);
    res.status(201).send({ project, user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/all", auth, async (req, res) => {
  // Get all
  const user = req.user;
  const projects = user.projects;
  res.status(201).send({ projects });
});

router.get("/:projectId", auth, checkRights, async (req, res) => {
  // Details
  const user = req.user;
  let project = user.projects.filter(project => {
    return project._id == req.params.projectId;
  });
  project = project[0];
  res.status(201).send({ project });
});

router.post("/:projectId", auth, checkRights, async (req, res) => {
  // Edit
  try {
    const projectId = req.params.projectId;
    const project = await Project.updateOne({ _id: projectId }, req.body);
    res.status(201).send({ project });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
