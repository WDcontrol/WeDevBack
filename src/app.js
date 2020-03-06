const express = require("express");
const { User, Project, Client, Lists, Sprint, Task } = require("./routers");
const cors = require("cors");
const port = process.env.PORT;
require("./db/db");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", User);
app.use("/clients", Client);
app.use("/tasks", Task);
app.use("/sprints", Sprint);
app.use("/projects", Project);
app.use("/list", Lists);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
