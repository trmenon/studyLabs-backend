const mongoose = require('mongoose');
const {Schema}= mongoose;

const NotesSchema = new Schema({
    notesTitle: {
        type: String,
        required: true,
    },
    notesDescription: {
        type: String,
        required: true,
    },
    subject: {
        type: Schema.ObjectId,
        ref: "Subject",
        required: true,
    },
    accessUrl: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Notes", NotesSchema);