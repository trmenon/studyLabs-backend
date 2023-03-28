const mongoose = require('mongoose');
const {Schema}= mongoose;

const ClassSchema = new Schema({
    classTitle: {
        type: String,
        required: true,
    },
    classDescription: {
        type: String,
        required: true,
    },
    handledBy: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    subject: {
        type: Schema.ObjectId,
        ref: "Subject",
        required: true,
    },
    enrolled: [
        { 
            type: Schema.ObjectId,
            ref: "User",
        }
    ],
    archives: [
        { 
            type: Schema.ObjectId,
            ref: "Notes",
        }
    ],
    isActive: {
        type: Boolean,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Class", ClassSchema);