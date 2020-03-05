const express = require("express");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", async (req, res) => {
  // Create a new project
  try {
    console.log(req.body);
    const project = new Project(req.body);
    await project.save();
    res.status(201).send({ project });
  } catch (error) {
    res.status(400).send(error);
  }
});

<<<<<<< HEAD
router.post('/edit/:id', async (req, res) => {
    // Edit existing project
    try {
        const project = await Project.update({
            _id: req.params.id
        },
        {
            title: req.body.title,
            estimateAmount: req.body.estimateAmount,
            completionDeadline: req.body.completionDeadline,
            startDate: req.body.startDate,
            dueDate: req.body.dueDate,
            status: req.body.status,
            stacks: req.body.stacks,
            hourlyCostDay: req.body.hourlyCostDay,
            sprints: req.body.sprints


        })
        res.status(201).send({ project })
    } catch (error) {
        res.status(400).send(error)
    }
})
=======
router.get("/all", async (req, res) => {
  // get all projects
  const projects = await Project.find({}).populate();
  res.status(201).send({ projects });
});
>>>>>>> 9840bfdc8f43b758a2fdd91aed991e94e01e3824

router.get("/details/:id", async (req, res) => {
  // Show details
  const id = req.params.id;
  const project = await Project.findById("5e5c2076ccf1e21cdc089e00");
  if (project) {
    res.status(201).send({ project });
  } else {
    res.status(400).send("No project");
  }
});

router.post("/edit/:id", async (req, res) => {
  // Edit existing project
  try {
    const id = req.params.id;
    const project = await Project.updateOne({ _id: id }, req.body);
    res.status(201).send({ project });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  // Delete
  try {
    const id = req.params.id;
    const project = await Project.findOneAndDelete({ _id: id });
    res.status(201).send({ project });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
