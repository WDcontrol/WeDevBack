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

sprintSchema.statics.isUserInProject = async function(user, projectId) {
  const project = await Project.findOne({
    _id: projectId,
    "users.user": user
  });
  return project ? true : false;
};

const Sprint = mongoose.model("Sprints", sprintSchema);

module.exports = Sprint;
