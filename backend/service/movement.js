exports.directionConverter = (command) => {
  return new Promise((resolve) => {
    try {
      switch (command.direction) {
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
