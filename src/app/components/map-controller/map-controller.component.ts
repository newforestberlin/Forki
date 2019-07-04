import { Component, OnInit } from '@angular/core';
import { DomManipulatorService } from '../../services/dom-manipulator.service';
import { PathfinderService } from '../../services/map.service';

@Component({
  selector: 'app-map-controller',
  templateUrl: './map-controller.component.html',
  styleUrls: ['./map-controller.component.scss']
})
export class MapControllerComponent implements OnInit {
  path;
  obstacleHeight = 50;
  obstacleWidth = 70;
  clearance = 10;
  constructor(private pathfinderService: PathfinderService, private domManipulator: DomManipulatorService) { }

  ngOnInit() {
  }

  createObstacle() {
    this.domManipulator.createObject("obstacle", this.obstacleWidth, this.obstacleHeight)
  }

  findPath() {
    this.pathfinderService.findPath();
  }
}