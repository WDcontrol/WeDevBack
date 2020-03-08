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
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;
