const mongoose = require('mongoose');
const {Schema}= mongoose;

const EnrollmentSchema = new Schema({
    student: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    classes: [
        { 
            type: Schema.ObjectId,
            ref: "Class",
        }
    ],
}, {timestamps: true});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);