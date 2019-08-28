const GPIO = require('rpi-gpio');
const database = require('./database')

const controllPins = [{
        // frontLeft
        Input1: 36,
        Input2: 32,
    }, {
        // frontRight
        Input1: 40,
        Input2: 38,
    },
    {
        // backLeft
        Input1: 37,
        Input2: 35,
    },
    {
        // backRight
        Input1: 19,
        Input2: 21,
    }
]

let checkTimeOut = new Date();

exports.setupPins = async () => {
    await GPIO.promise.destroy();
    for (let i = 0; i < controllPins.length; i++) {
        const pins = controllPins[i];
        for (let pin in pins) {
            await GPIO.promise.setup(pins[pin], GPIO.DIR_OUT)
            await GPIO.promise.write(pins[pin], false);
        }
    }
}

exports.move = async (direction, time) => {
    console.log(direction)
    checkTimeOut = new Date();
    const directionCode = await directionConverter(direction);
    if (await obstacleValidator(direction) !== true) {
        for (let i = 0; i < direction.length; i++) {
            console.log(direction)
            await rotateMotor(directionCode[i], i)
        }
        const interval = setInterval(() => {
            if ((new Date() - checkTimeOut) > 200) {
                setAllPinsToFalse();
                clearInterval(interval);
            }
        }, 100)
    } else {
        setAllPinsToFalse();
    }
}

async function rotateMotor(direction, motor) {
    return new Promise(async resolve => {
        const motorPins = controllPins[motor]
        if (direction === 0) {
            await GPIO.promise.write(motorPins.Input1, true);
            await GPIO.promise.write(motorPins.Input2, false);
        } else if (direction === 1) {
            await GPIO.promise.write(motorPins.Input1, false);
            await GPIO.promise.write(motorPins.Input2, true);
        }
        resolve()
    })
}

async function setAllPinsToFalse() {
    for (let i = 0; i < controllPins.length; i++) {
        const pins = controllPins[i];
        for (let pin in pins) {
            await GPIO.promise.write(pins[pin], false);
        }
    }
}

async function directionConverter(direction) {
    return new Promise((resolve) => {
        try {
            switch (direction) {
                case "forwards":
                    resolve([1, 0, 1, 0]);
                    break;
                case "backwards":
                    resolve([0, 1, 0, 1]);
                    break;
                case "left":
                    resolve([0, 0, 1, 1]);
                    break;
                case "right":
                    resolve([1, 1, 0, 0]);
                    break;
                case "turn right":
                    resolve([1, 1, 1, 1]);
                    break;
                case "turn left":
                    resolve([0, 0, 0, 0]);
                    break;
            }
        } finally {
            resolve(false);
        }
    });
}

async function obstacleValidator(direction) {
    return new Promise(async (resolve) => {
        const ultrasonic = await database.getUltrasonic();
        if (!ultrasonic) {
            resolve(true)
        } else {
            try {
                switch (direction) {
                    case "forwards":
                        if (ultrasonic.front.dist < 8 || ultrasonic.back.dist < 8) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                        break;
                    case "left":
                        if (ultrasonic.left.dist < 15) {
                            resolve(true);
                        } else {
                            resolve(false)
                        }
                        break;
                    case "right":
                        if (ultrasonic.right.dist < 15) {
                            resolve(true);
                        } else {
                            console.log(ultrasonic.right.dist)
                            resolve(false);
                        }
                        break;
                }
            } finally {
                resolve(false);
            }
        }
    });
}