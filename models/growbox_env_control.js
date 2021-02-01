const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose);

const GrowboxEnvControlSchema = new mongoose.Schema({
    boxID: {
        type: String,
        required: true,
    },
    // Default in degree celsius
    temperature: {
        enabled: {
            type: Boolean,
            default: false,
        },
        high: {
            type: Float,
            defualt: 28.0,
        },
        low: {
            type: Float,
            defualt: 20.0,
        },
        displayInFahrenheit: {
            type: Boolean,
            default: false,
        },
    },
    // Relative humidity. Example: 55%
    humidity: {
        enabled: {
            type: Boolean,
            default: false,
        },
        high: {
            type: Number,
            defualt: 65,
        },
        low: {
            type: Number,
            defualt: 40,
        },
    },
    // CO2 concentration in Parts Per Million. Example: 500 PPM
    co2: {
        enabled: {
            type: Boolean,
            default: false,
        },
        high: {
            type: Float,
            defualt: 850,
        },
        low: {
            type: Float,
            defualt: 400,
        },
    },
    // Default in degree celsius
    waterTemperature: {
        enabled: {
            type: Boolean,
            default: false,
        },
        high: {
            type: Float,
            defualt: 25.0,
        },
        low: {
            type: Float,
            defualt: 15.0,
        },
        displayInFahrenheit: {
            type: Boolean,
            default: false,
        },
    },
    waterPh: {
        enabled: {
            type: Boolean,
            default: false,
        },
        high: {
            type: Float,
            defualt: 6.5,
        },
        low: {
            type: Float,
            defualt: 5.5,
        },
    },
    // Nutrition density in water tank in parts per million. Example: 500 PPM
    nutritionDensity: {
        enabled: {
            type: Boolean,
            default: false,
        },
        high: {
            type: Float,
            defualt: 500,
        },
        low: {
            type: Float,
            defualt: 200,
        },
    },
    // TODO: Update schema model in intensity if full spectrum light is used
    mainLight: {
        enabled: {
            type: Boolean,
            default: false,
        },
        turnOn: {
            hour: {
                type: String,
                required: function () { return this.enabled === true; }
            },
            minute: {
                type: String,
                required: function () { return this.enabled === true; }
            },
        },
        turnOff: {
            hour: {
                type: String,
                required: function () { return this.enabled === true; }
            },
            minute: {
                type: String,
                required: function () { return this.enabled === true; }
            },
        },
        vegLight: {
            type: Boolean,
            default: false,
        },
        bloomLight: {
            type: Boolean,
            default: false,
        },
        farRedLight: {
            type: Boolean,
            default: false,
        },
    },
    sideLight: {
        enabled: {
            type: Boolean,
            default: false,
        },
    },
    airCirculation: {
        enabled: {
            type: Boolean,
            default: true,
        },
    },
    carbonFilter: {
        enabled: {
            type: Boolean,
            default: true,
        },
    },
    waterAirPump: {
        enabled: {
            type: Boolean,
            default: true,
        },
    },
    // doorLock: {
    //     enabled: {
    //         type: Boolean,
    //         default: true,
    //     },
    // },
    camera: {
        enabled: {
            type: Boolean,
            default: false,
        },
        photoShoot: {
            monday: [{
                hour: Number,
                minute: Number,
            }],
            tuesday: [{
                hour: Number,
                minute: Number,
            }],
            wednesday: [{
                hour: Number,
                minute: Number,
            }],
            thursday: [{
                hour: Number,
                minute: Number,
            }],
            friday: [{
                hour: Number,
                minute: Number,
            }],
            saturday: [{
                hour: Number,
                minute: Number,
            }],
            sunday: [{
                hour: Number,
                minute: Number,
            }],
        }
    },
});

const GrowboxEnvControl = mongoose.model('growbox', GrowboxEnvControlSchema);

module.exports = GrowboxEnvControl;