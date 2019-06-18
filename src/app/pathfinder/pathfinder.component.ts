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
  path;
  obstacleHeight = 50;
  obstacleWidth = 70;
  clearance = 10;
  constructor(private pathfinderService: PathfinderService, private domManipulator: DomManipulatorService) { }

  ngOnInit() {
  }

  createObstacle() {
    this.domManipulator.createObject("obstacle",this.obstacleWidth, this.obstacleHeight)
  }

  findPath() {
    this.pathfinderService.findPath();
  }
}
