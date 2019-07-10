const movement = require("../service/movement");

exports.directionValidator = async (command) => {
  return await movement.directionValidator(command);
}
