const express = require("express");
const userRouter = require("./routers/user");
const clientRouter = require("./routers/client");
const port = process.env.PORT;
require("./db/db");

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/clients", clientRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
