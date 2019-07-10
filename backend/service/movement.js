exports.directionValidator = (command) => {
  return new Promise((resolve) => {
    try {
      switch (command.direction) {
        case "forwards":
          resolve(true);
          break;
        case "backwards":
          resolve(true);
          break;
        case "left":
          resolve(true);
          break;
        case "right":
          resolve(true);
          break;
        case "turn right":
          resolve(true);
          break;
        case "turn left":
          resolve(true);
          break;
      }
    } finally {
      resolve(false);
    }
  });
}

exports.forkMovementListener = (req, res, next) => {
  const forkState = "down";
  const stepMotorRotation = 90; // deg
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
