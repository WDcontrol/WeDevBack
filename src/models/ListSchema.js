const mongoose = require("mongoose");

const ListSchema = mongoose.Schema({
  name: String
});

const ProjectStatuses = mongoose.model("ProjectStatuses", ListSchema);
const SprintStatuses = mongoose.model("SprintStatuses", ListSchema);
const TaskStatuses = mongoose.model("TaskStatuses", ListSchema);
const UserStatuses = mongoose.model("UserStatuses", ListSchema);
const UserProfils = mongoose.model("UserProfils", ListSchema);

module.exports = {
  ProjectStatuses,
  SprintStatuses,
  TaskStatuses,
  UserStatuses,
  UserProfils
};
