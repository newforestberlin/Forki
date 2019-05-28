import { Component, OnInit } from '@angular/core';
import { DomManipulatorService } from '../services/dom-manipulator.service';
import { ViewEncapsulation } from '@angular/core';
import { PathfinderService } from '../services/pathfinder.service';

@Component({
  selector: 'app-pathfinder',
  templateUrl: './pathfinder.component.html',
  styleUrls: ['./pathfinder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PathfinderComponent implements OnInit {

  width = 50;
  height = 50;
  path;
  obstacleHeight = 50;
  obstacleWidth = 70;
  constructor(private domManipulator: DomManipulatorService, private pathfinderService: PathfinderService) { }

  ngOnInit() {
    this.domManipulator.createMap(this.width, this.height);
    this.domManipulator.createEndPoint();
    this.domManipulator.createStartPoint();
  }

  createObstacle() {
    this.domManipulator.createObstacle(this.obstacleWidth, this.obstacleHeight);
  }
  checkUnwalkable() {
    this.pathfinderService.findPath();
  }
}
