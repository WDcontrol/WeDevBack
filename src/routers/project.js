const express = require("express");
const Project = require("../models/Project");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  // Create a new project
  try {
    const project = new Project(req.body);
    await project.save();

    const user = await User.update(
      { _id: req.user._id },
      { $push: { projects: project } }
    );

    res.status(201).send({ project, user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/all", auth, async (req, res) => {
  // get all projects
  const user = req.user;
  const projects = await Project.find({ "users.user": user });
  res.status(201).send({ projects });
});

router.get("/details/:id", auth, async (req, res) => {
  // Show details
  const id = req.params.id;
  const user = req.user;
  const project = await Project.find({ _id: id, "users.user": user });
  if (project.length > 0) {
    res.status(201).send({ project });
  } else {
    res.status(400).send("No project");
  }
});

router.post("/edit/:id", auth, async (req, res) => {
  // Edit existing project
  try {
    const id = req.params.id;
    const user = req.user;
    const project = await Project.updateOne(
      { _id: id, "users.user": user },
      req.body
    );
    res.status(201).send({ project });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
