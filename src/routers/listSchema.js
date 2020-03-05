const express = require("express");
const {
  ProjectStatuses,
  SprintStatuses,
  TaskStatuses,
  UserStatuses,
  UserProfils
} = require("../models/ListSchema");

const router = express.Router();

router.get("/projectStatuses", async (req, res) => {
  // get all project statuses
  const statuses = await ProjectStatuses.find({});
  res.status(201).send({ statuses });
});

router.get("/sprintStatuses", async (req, res) => {
  // get all sprint statuses
  const statuses = await SprintStatuses.find({});
  res.status(201).send({ statuses });
});

router.get("/taskStatuses", async (req, res) => {
  // get all task statuses
  const statuses = await TaskStatuses.find({});
  res.status(201).send({ statuses });
});

router.get("/userStatuses", async (req, res) => {
  // get all user statuses
  const statuses = await UserStatuses.find({});
  res.status(201).send({ statuses });
});

router.get("/userProfils", async (req, res) => {
  // get all user profils
  const profils = await UserProfils.find({});
  res.status(201).send({ profils });
});

module.exports = router;
