const mongoose = require("mongoose");
const Project = require("./Project");

const sprintSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    startDate: {
      type: Date
    },
    dueDate: {
      type: Date
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SprintStatuses"
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projects",
      required: true
    }
  },
  {
    timestamps: true
  }
);

sprintSchema.statics.isUserInProject = async function(user, projectId, res) {
  const project = await Project.findOne({
    _id: projectId,
    "users.user": user
  });
  if (!project) {
    res.status(400).send({ error: "User can't access this project" });
  }
  return project ? true : false;
};

const Sprint = mongoose.model("Sprints", sprintSchema);

module.exports = Sprint;
