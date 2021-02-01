const mongoose = require("mongoose");

const GrowboxInfoSchema = new mongoose.Schema({
    box_id: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: String,
        required: true,
    },
    modelNumber: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    activationDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const GrowboxInfo = mongoose.model('growbox', GrowboxInfoSchema);

module.exports = GrowboxInfo;