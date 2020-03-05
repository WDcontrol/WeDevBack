const express = require("express");
const { User, Project, Client, Lists } = require("./routers");

const port = process.env.PORT;
require("./db/db");

const app = express();

app.use(express.json());

app.use("/users", User);
app.use("/clients", Client);
app.use("/projects", Project);
app.use("/list", Lists);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
