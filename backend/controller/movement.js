// var exampleModel = require('../models/example-model');

var forkState = "down";
const stepMotorRotation = 90; // deg

exports.forkMovementListener = (req, res, next) => {
    const command = req.params.command;
    if (forkState != command) {
        if (command === "up") {
            // Rotate StepMotor to the right
            this.moveFork(stepMotorRotation);
            forkState = command;
        } else if (command === "down") {
            // Rotate StepMotor to the left
            this.moveFork(-stepMotorRotation);
            forkState = command;
        }
    }
}

function moveFork(stepMotorRotation) {
    // rotate motor
}

exports.directionListener = (req, res, next) => {
    console.log(req.body);
    directionController(direction);
}

function directionController(direction) {
    // 1 - forwards; 0 - backwards
    switch (direction) {
        case "forwards":
            wheelController(1, 0, 1, 0);
            break;
        case "backwards":
            wheelController(0, 1, 0, 1);
            break;
        case "left":
            wheelController(0, 0, 1, 1);
            break;
        case "right":
            wheelController(1, 1, 0, 0);
            break;
        case "turn right":
            wheelController(1, 1, 1, 1);
            break;
        case "turn left":
            wheelController(0, 0, 0, 0);
            break;
    }
}

async function wheelController(wheelFL, wheelFR, wheelBL, wheelBR) {
    // rotate all wheels
    await sleep();
    // stop all
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}