const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    estimateAmount: {
      // Montant du devis
      type: Number,
      trim: true,
      required: true
    },
    completionDeadline: {
      // Délais de réalisation (en jour)
      type: Number,
      trim: true,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectStatuses",
      required: true
    },
    stacks: {
      type: String,
      trim: true,
      required: true
    },
    hourlyCostDay: {
      // Coût horaire jour
      type: Number,
      required: true
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clients",
      required: true
    },
    sprints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sprints"
      }
    ]
  },
  {
    timestamps: true
  }
);

projectSchema.statics.addSprint = async function(projectId, sprint) {
  const Project = this;
  const project = await Project.updateOne(
    { _id: projectId },
    { $push: { sprints: sprint } }
  );
  return project;
};

const Project = mongoose.model("Projects", projectSchema);

module.exports = Project;
