import { Component, OnInit } from '@angular/core';
import { DomManipulatorService } from '../services/dom-manipulator.service';
import { ViewEncapsulation } from '@angular/core';
import { PathfinderService } from '../services/pathfinder.service';
import { SocketListenerService } from '../services/socket-listener.service';

@Component({
  selector: 'app-pathfinder',
  templateUrl: './pathfinder.component.html',
  styleUrls: ['./pathfinder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PathfinderComponent implements OnInit {
  mapWidth = 525;
  mapHeight = 525;
  path;
  obstacleHeight = 50;
  obstacleWidth = 70;
  clearance = 10;
  x0 = 0;
  x1 = 0;
  x2 = 1;
  y0 = 0;
  y1 = 1;
  y2 = 1;
  constructor(private domManipulator: DomManipulatorService, private pathfinderService: PathfinderService, private socketListenerService: SocketListenerService) { }

  ngOnInit() {
    this.domManipulator.createTargetPoint();
    this.domManipulator.createStartPoint();
    this.socketListenerService.initIoConnection();
    this.pathfinderService.getAnchorParameters();
  }

  createObstacle() {
    this.domManipulator.createObstacle(this.obstacleWidth, this.obstacleHeight)
  }

  findPath() {
    this.pathfinderService.findPath();
  }

  setMapSize() {
    this.domManipulator.setMapSize(this.mapWidth, this.mapHeight);
  }

  setTargetPosition() {
    this.pathfinderService.setTargetPosition();
  }
  setObstacleParameters() {
    this.pathfinderService.setObstacleParameters();
  }

  setAnchorPosition() {
    this.pathfinderService.setAnchorPosition(this.x0, this.x1, this.x2, this.y0, this.y1, this.y2)
  }
}
