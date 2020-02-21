const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
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
        ref: "TaskStatus"
    },
    realisationTime: { // Temps de réalisation (int en heure)
        type: Number,
        required: true,
        trim: true,
        get: v => Math.round(v),
        set: v => Math.round(v)
    },
}, {
    timestamps: true,
});

const Task = mongoose.model("User", taskSchema);

module.exports = Task;