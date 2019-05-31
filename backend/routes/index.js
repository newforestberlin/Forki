var express = require("express");
var router = express.Router();

var ExampleController = require("../controller/movement");
var RoutingController = require("../controller/routing");

// routing
router.get('/getpath/:id/:width/:height/:elementSize/:clearance', RoutingController.getPath);
router.get('/robotposition/:id', RoutingController.getRobotPosition);
router.get('/targetposition/:id', RoutingController.getTargetPosition);
router.get('/obstacleparameters/:id', RoutingController.getObstacleParameters);

router.post('/robotupdate', RoutingController.setRobotPosition);
router.post('/targetupdate', RoutingController.setTargetPosition);
router.post('/obstacleupdate', RoutingController.setObstacleParameters);



// movement
/* router.post('/fork', ExampleController.forkMovementListener);
router.post('/move', ExampleController.directionListener); */

module.exports = router;
