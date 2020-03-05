const express = require("express");
const Sprint = require("../models/Sprint");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  // Create a new project
  try {
    console.log(req.body);
    const sprint = new Sprint(req.body);
    await sprint.save();
    res.status(201).send({ sprint });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/edit/:id', async (req, res) => {
    // Edit existing project
    try {
        const sprint = await Sprint.update({
            _id: req.params.id
        },
        {
            title: req.body.title,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            status: req.body.status,
            task: req.body.task


        })
        res.status(201).send({ project })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get("/all", async (req, res) => {
    // get all projects
    const sprints = await Sprint.find({}).populate();
    res.status(201).send({ sprints });
  });

  router.get("/details/:id", async (req, res) => {
    // Show details
    const id = req.params.id;
    const sprint = await Project.findById(id);
    if (sprint) {
      res.status(201).send({ sprint });
    } else {
      res.status(400).send("No project");
    }
  });
