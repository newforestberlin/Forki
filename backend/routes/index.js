var express = require("express");
var router = express.Router();

var ExampleController = require("../controller/movement");
var RoutingController = require("../controller/routing");

// routing
router.get('/getpath/:width/:height/:elementSize/:clearance', RoutingController.getPath);
router.get('/robotposition', RoutingController.getRobotPosition);
router.get('/targetposition', RoutingController.getTargetPosition);
router.get('/obstacleparameter', RoutingController.getObstacleParameters);

router.post('/targetposition', RoutingController.setTargetPosition);
router.post('/obstacleparameter', RoutingController.setObstacleParameters);


// movement
/* router.post('/fork', ExampleController.forkMovementListener);
router.post('/move', ExampleController.directionListener); */

module.exports = router;
