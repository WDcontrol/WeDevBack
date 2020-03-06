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
      trim: true
    },
    completionDeadline: {
      // Délais de réalisation en jour
      type: Number,
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
      ref: "ProjectStatuses"
    },
    stacks: {
      type: String,
      trim: true,
      required: true
    },
    hourlyCostDay: {
      // Coût horaire jour
      type: Number
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clients"
    },
    users: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users"
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model("Projects", projectSchema);

module.exports = Project;
