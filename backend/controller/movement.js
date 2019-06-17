const movement = require("../service/movement");

exports.directionConverter = async (command) => {
  return command.direction = await movement.directionConverter(command);
}