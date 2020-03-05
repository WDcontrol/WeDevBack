const express = require("express");
const Project = require("../models/Project");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  // Create a new project
  try {
    const user = req.user;
    //req.body = { ...req.body, users: [{ user: user._id }] };
    const project = new Project(req.body);

    const updatedUser = await User.updateOne(
      { _id: user._id },
      { $push: { projects: { project } } }
    );

    await project.save();

    res.status(201).send({ project, updatedUser });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/all", auth, async (req, res) => {
  // get all projects
  const user = req.user;
  const projects = await Project.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "projects.project",
        as: "userList"
      }
    }
  ]);
  // const projects = await Project.find({ "users.user": user });
  res.status(201).send({ projects });
});

router.get("/details/:id", auth, async (req, res) => {
  // Show details
  const id = req.params.id;
  const user = req.user;
  const project = await Project.find({ _id: id, "users.user": user });
  if (project) {
    res.status(201).send({ project });
  } else {
    res.status(400).send("No project");
  }
});

router.post("/edit/:id", auth, async (req, res) => {
  // Edit existing project
  try {
    const id = req.params.id;
    const project = await Project.updateOne({ _id: id }, req.body);
    res.status(201).send({ project });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
