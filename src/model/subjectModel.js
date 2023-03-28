const mongoose= require('mongoose');
const {Schema}= mongoose;

const SubjectSchema = new Schema({
    subjectTitle: {
        type: String,
        required: true,
    },
    subjectDescription: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Subject", SubjectSchema);