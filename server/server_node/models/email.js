const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const emailSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    url:{
        type: String,
        required: true,
        unique: true
    },
    status:{
        type: String,
        enum: ["excel","non-excel"],
        default: "non-excel"
    }
})

module.exports = mongoose.model("Email", emailSchema);

