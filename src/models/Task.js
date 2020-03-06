const mongoose = require("mongoose");
const Project = require("./Project");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskStatuses"
    },
    realisationTime: {
      // Temps de réalisation (int en heure)
      type: Number,
      trim: true,
      get: v => Math.round(v),
      set: v => Math.round(v)
    },
    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprints",
      required: true
    }
  },
  {
    timestamps: true
  }
);

taskSchema.statics.isUserInProject = async function(user, projectId, res) {
  const project = await Project.find({ "users.user": user, _id: projectId });
  if (!project) {
    res.status(400).send({ error: "User can't access this project" });
  }
  return project ? true : false;
};

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;
