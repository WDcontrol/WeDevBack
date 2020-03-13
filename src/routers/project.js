const express = require("express");
const Project = require("../models/Project");
const User = require("../models/User");
const { auth, checkRights } = require("../middleware");
const axios = require("axios");

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

router.post("/:projectId/addIssue", auth, checkRights, async (req, res) => {
  // Add issue
  try {
    const gitCredentials = req.body.gitCredentials;
    const gitParams = req.body.gitParams;
    const githubRepo = req.project[0].githubRepo;

    axios
      .post(
        "https://api.github.com/repos/" +
          githubRepo.owner +
          "/" +
          githubRepo.name +
          "/issues",
        gitParams,
        {
          auth: {
            username: gitCredentials.username,
            password: gitCredentials.password
          }
        }
      )
      .then(function(result) {
        res.status(201).send(result.data);
      })
      .catch(function(error) {
        res.status(400).send(error.response.data);
      });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/add/gitProject", auth, async (req, res) => {
  // request : {"repo": "https://github.com/WDcontrol/WeDevBack"} , need a addProject.md repo on project root
  try {
    const repo = req.body.repo.split("github.com/")[1];
    axios
      .get("https://api.github.com/repos/" + repo + "/contents/addProject.md")
      .then(async function(result) {
        let data = result.data.content;
        let buff = Buffer.from(data, "base64");
        let text = buff.toString("ascii");

        const project = new Project(JSON.parse(text));
        await project.save();
        res.status(201).send(project);
      })
      .catch(function(error) {
        console.log(error);
        res.status(400).send(error);
      });
  } catch (err) {
    res.status(400).send({ error: "Can't find addProject at project root" });
  }
});

module.exports = router;
