const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskStatuses",
      required: true
    },
    realisationTime: {
      // Temps de réalisation (en heure)
      type: Number,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;
