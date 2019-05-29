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
  mapWidth = 700;
  mapHeight = 500;
  path;
  obstacleHeight = 50;
  obstacleWidth = 70;
  clearance = 10;
  constructor(private domManipulator: DomManipulatorService, private pathfinderService: PathfinderService) { }

  ngOnInit() {
    this.domManipulator.createTargetPoint();
    this.domManipulator.createStartPoint();
  }

  createObstacle() {
    this.domManipulator.createObstacle(this.obstacleWidth, this.obstacleHeight)
  }

  findPath(){
    this.pathfinderService.findPath();
  }

  setMapSize() {
    this.pathfinderService.setMapSize(this.mapWidth, this.mapHeight);
  }
}
