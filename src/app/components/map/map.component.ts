import { Component, OnInit } from '@angular/core';
import { DomManipulatorService } from '../../services/dom-manipulator.service';
import { PathfinderService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private pathfinderService: PathfinderService, private domManipulator: DomManipulatorService) { }

  ngOnInit() {
    this.setInitialMapSize();
    this.domManipulator.createObject("target");
  }
  setInitialMapSize() {
    this.domManipulator.setMapSize(500, 500);
  }
  setTargetPosition() {
    this.pathfinderService.setTargetPosition();
  }
  setObstacleParameters() {
    this.pathfinderService.setObstacleParameters();
  }
}
