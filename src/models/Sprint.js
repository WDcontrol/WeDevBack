const mongoose = require("mongoose");

const sprintSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SprintStatus"
    },
    tasks: [
        {
            task: {
                type: mongoose.Schema.Types.ObjectId,
                task: "Sprint"
            }
        }
    ],
}, {
    timestamps: true,
});

const Sprint = mongoose.model("User", sprintSchema);

module.exports = Sprint;
