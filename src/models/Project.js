const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    estimateAmount: { // Montant du devis
        type: Number,
        required: true,
        trim: true
    },
    completionDeadline: { // Délais de réalisation
        type: Number,
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
        ref: "ProjectStatus"
    },
    stacks: {
        type: String,
        required: true,
        trim: true
    },
    hourlyCostDay: { // Coût horaire jour
        type: Number,
        required: true
    },
    sprints: [
        {
            sprint: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Sprint"
            }
        }
    ],
}, {
    timestamps: true,
});

const Project = mongoose.model("User", projectSchema);

module.exports = Project;
