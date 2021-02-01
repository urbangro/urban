var express = require('express');
var router = express.Router();

const BoxControl = require('../models/growbox_env_control.js');
/*
    Auto control query string from GrowBox

    ATEMA-on	// Auto Air Temp
    ATEMX-33.0	// Air Temp Max
    ATEMN-18.0	// Air Temp Min
    AHUMA-off	// Auto Air Humidity
    AHUMX-85.0	// Air Humi Max
    AHUMN-18.0 	// Air Humi Min
    ACO2A-off   // Auto Air CO2
    ACO2X-2000	// Air CO2 Max 
    ACO2N-500	// Air CO2 Min
    WTEMA-on	// Auto Water Temp
    WTEMX-25.0 	// Water Temp Max
    WTEMN-14.0	// Water Temp Min
    WPPMA-on	// Auto Water PPM
    WPPMX-1800	// Water PPM Max
    WPPMN-0		// Water PPM Min
    WPHVA-on	// Auto Water PH Value
    WPHVX-6.5	// Water pH Max
    WPHVN-5.0	// Water pH Min
    SLIGM-on    // Main Light Switch Auto Control
    SLION-1551829145
                // Main Light Switch On time, in milliseconds
    SLIOF       // Main Light Switch Off time
    SLIGV-on    // Main Light Veg Switch
    SLIGB-off   // Main Light Bloom Switch
    SLIGF-off   // Main Light Far Red Switch
    SLIGS-off   // Side Light Switch
    SAFAN-on    // Air Circulation Fan Switch
    SCARB-on    // Carbon Filter Switch
    SWAIR-on    // waterAirPump
*/

// TODO: Client send request to Grow Box directly, not through backend
router.get('/dashboard', function (req, res, next) {
    let roomParam = getEnvironmentParameters(req.body.boxid);
    res.render('dashboard',
        {
            title: 'Grow room dashboard',
        });
})

/* 
    On dashboard page, read environment information from box every 5 second
    example: /getRoomParam/?box_id=123 
*/
router.get('/getEnvParam', function (req, res, next) {
    res.send(getEnvironmentParameters(req.query.box_id));
});

// Reguest grow box enviroment parameters 
function getEnvironmentParameters(boxId) {
    // if(process.env.NODE_ENV === 'production' ) {}

    let growRoomEnvironment = {
        'ATEMP': 25,
        'AHUMI': 51,
        'ACO2': 600 + parseInt(Math.random() * 180),
        'WTEMP': 10 + parseInt(Math.random() * 10),
        'WPH': (Math.random() + 5).toFixed(2),
        'WPPM': 600 + parseInt(Math.random() * 50),
        'WLVL': 'HIGH',
        'LIGM': 'On',
        'LIGS': 'On',
    };

    return growRoomEnvironment;
}

router.get('/getAutoControl', function (req, res, next) {
    let boxID = req.body.boxid;

    BoxControl.findOne({ boxID: boxID }).exec((err, envCtrl) => {
        if (!envCtrl) {
            let newBoxEnvAutoCtrl = new BoxControl({
                boxID: boxID,
            });
            newBoxEnvAutoCtrl
                .save()
                .then((value) => {
                    console.log("Default auto control param created for box : " + boxID);
                    console.log(value);
                    envCtrl = newBoxEnvAutoCtrl;
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('../');
                });
        }
        res.render('environment',
            {
                title: 'Grow your plant automatically',
                temperature: envCtrl.temperature,
                humidity: envCtrl.humidity,
                co2: envCtrl.co2,
                waterTemperature: envCtrl.waterTemperature,
                waterPh: envCtrl.waterPh,
                nutritionDensity: envCtrl.nutritionDensity,
                mainLight: envCtrl.mainLight,
                sideLight: envCtrl.sideLight,
                airCirculation: envCtrl.airCirculation,
                carbonFilter: envCtrl.carbonFilter,
                waterAirPump: envCtrl.waterAirPump,
                camera: envCtrl.camera,
            });
    });
})

/* 
    Client update grow box auto control 
    a. Add new record in DataBase
    b. Send request to grow box(Should send to grow box directly instead of through backend)
*/
router.post('/updateAutoControl', function (req, res, next) {

    let autoControl = {};

    autoControl.boxID = req.body.boxid;
    // TODO: checked if user logged in and boxID linked to userID

    /* AIR */
    if (req.body.ATEMA) {
        autoControl.temperature.enabled = req.body.ATEMA === 'on';
        if (autoControl.temperature.enabled) {
            autoControl.temperature.high = req.body.ATEMX;
            autoControl.temperature.low = req.body.ATEMN;
        }
    }
    if (req.body.AHUMA) {
        autoControl.humidity.enabled = req.body.AHUMA === 'on';
        if (autoControl.temperature.enabled) {
            autoControl.humidity.high = req.body.AHUMX;
            autoControl.humidity.low = req.body.AHUMN;
        }
    }
    if (req.body.ACO2A) {
        autoControl.co2.enabled = req.body.ACO2A === 'on';
        if (autoControl.co2.enabled) {
            autoControl.co2.high = req.body.ACO2X;
            autoControl.co2.low = req.body.ACO2N;
        }
    }
    /* WATER */
    if (req.body.WTEMA) {
        autoControl.waterTemperature.enabled = req.body.WTEMA === 'on';
        if (autoControl.waterTemperature.enabled) {
            autoControl.waterTemperature.high = req.body.WTEMX;
            autoControl.waterTemperature.low = req.body.WTEMN;
        }
    }
    if (req.body.WPPMA) {
        autoControl.waterPh.enabled = req.body.WPPMA === 'on';
        if (autoControl.waterPh.enabled) {
            autoControl.waterPh.high = req.body.WPPMX;
            autoControl.waterPh.low = req.body.WPPMN;
        }
    }
    if (req.body.WPHVA) {
        autoControl.waterPh.enabled = req.body.WPHVA === 'on';
        if (autoControl.waterPh.enabled) {
            autoControl.waterPh.high = req.body.WPHVX;
            autoControl.waterPh.low = req.body.WPHVN;
        }
    }
    /* POWER SWITCH */
    if (req.body.SLIGM) {
        autoControl.mainLight.enabled = req.body.SLIGM === 'on';
        if (autoControl.mainLight.enabled) {
            autoControl.mainLight.vegLight = req.body.SLIGV;
            autoControl.mainLight.bloomLight = req.body.SLIGB;
            autoControl.mainLight.farRedLight = req.body.SLIGF;
        }
    }
    if (req.body.SAFAN) {
        autoControl.airCirculation.enabled = req.body.SAFAN === 'on';
    }
    if (req.body.SCARB) {
        autoControl.carbonFilter.enabled = req.body.SCARB === 'on';
    }
    if (req.body.SWAIR) {
        autoControl.waterAirPump.enabled = req.body.SWAIR === 'on';
    }

    const envControl = new BoxControl(autoControl);
    envControl
        .save()
        .then((value) => {
            console.log('Auto Control updated succesfully');
            console.log(value);

            req.flash('success_message', 'You have updated grow box auto control!');
        })
        .catch((err) => {
            console.log(err)
            req.flash('error_message', 'Auto Control update failed!');
        });

});

module.exports = router;
