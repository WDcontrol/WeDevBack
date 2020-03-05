const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  // Create a new task
  try {
    console.log(req.body);
    const task = new Task(req.body);
    await task.save();
    res.status(201).send({ task });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/edit/:id', async (req, res) => {
    // Edit existing task
    try {
        const task = await Task.update({
            _id: req.params.id
        },
        {
            title: req.body.title,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            status: req.body.status

        })
        res.status(201).send({ project })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get("/all", async (req, res) => {
    // get all task
    const tasks = await Task.find({}).populate();
    res.status(201).send({ tasks });
  });

  router.get("/details/:id", async (req, res) => {
    // Show details
    const id = req.params.id;
    const task = await Task.findById(id);
    if (task) {
      res.status(201).send({ task });
    } else {
      res.status(400).send("No project");
    }
  });
