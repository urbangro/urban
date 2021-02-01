const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

const GrowboxEnvSchema = new mongoose.Schema({
    serial_number: {
        type: String,
        required: true,
    },
    temperature: {
        value: {
            type: Float,
            required: true,
        },
    },
    humidity: {
        value: {
            type: Number,
            required: true,
        },
    },
    co2: {
        value: {
            type: Float,
            required: true,
        },
    },
    waterTemperature: {
        value: {
            type: Float,
            required: true,
        },
    },
    waterPh: {
        value: {
            type: Float,
            required: true,
        },
    },
    nutritionDensity: {
        value: {
            type: Float,
            required: true,
        },
    },
    mainLight: {
        vegLight: {
            type: Boolean,
            required: true,
        },
        bloomLight: {
            type: Boolean,
            required: true,
        },
        farRedLight: {
            type: Boolean,
            required: true,
        },
    },
    carbonFilter: {
        value: {
            type: Boolean,
            required: true,
        },
    },
    waterAirPump: {
        value: {
            type: Boolean,
            required: true,
        },
    },
    camera: {
        value: {
            type: Boolean,
            required: true,
        },
    },
});

const GrowboxEnvCtrl = mongoose.model('growbox', GrowboxEnvControlSchema);

module.exports = GrowboxEnvCtrl;