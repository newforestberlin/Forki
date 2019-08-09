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