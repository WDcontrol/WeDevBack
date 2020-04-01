const express = require("express");
const {
  user,
  project,
  client,
  lists,
  sprint,
  task,
  stripe
} = require("./routers");
const cors = require("cors");
const port = process.env.PORT || 8000;
require("./db/db");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", user);
app.use("/clients", client);
app.use("/tasks", task);
app.use("/sprints", sprint);
app.use("/projects", project);
app.use("/list", lists);
app.use("/stripe", stripe);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
