const mongoose = require('mongoose');
const {Schema}= mongoose;

const WalletSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Wallet", WalletSchema);