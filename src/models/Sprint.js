const mongoose = require("mongoose");

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
      ref: "SprintStatuses",
      required: true
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tasks"
      }
    ]
  },
  {
    timestamps: true
  }
);

sprintSchema.statics.addTask = async function(sprintId, task) {
  const Sprint = this;
  const sprint = await Sprint.updateOne(
    { _id: sprintId },
    { $push: { tasks: task } }
  );
  return sprint;
};

const Sprint = mongoose.model("Sprints", sprintSchema);

module.exports = Sprint;
