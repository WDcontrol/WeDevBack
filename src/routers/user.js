const express = require("express");
const User = require("../models/User");
const { auth } = require("../middleware");

const router = express.Router();

router.post("/", async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/edit", auth, async (req, res) => {
  // Edit
  try {
    const userId = req.user._id;
    const user = await User.updateOne({ _id: userId }, req.body);
    res.status(201).send({ user });
  } catch (err) {
    res.status(400).send({ error });
  }
});

router.get("/all", async (req, res) => {
  // Get all
  const users = await User.find({});
  res.status(201).send({ users });
});

router.post("/login", async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: "Invalid login credentials" });
  }
});

router.get("/me", auth, async (req, res) => {
  // View logged in user profile
  const user = req.user;
  res.send({ user });
});

router.post("/me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.status(200).send("Disconnected");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.status(200).send("Disconnected all");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
