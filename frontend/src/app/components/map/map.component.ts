import { Component, OnInit } from '@angular/core';
import { DomManipulatorService } from '../../services/dom-manipulator.service';
import { ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SocketService } from 'src/app/services/socket.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  path;
  obstacleHeight = 50;
  obstacleWidth = 70;
  clearance = 10;

  constructor(private domManipulator: DomManipulatorService, private socketService: SocketService) { }

  ngOnInit() {
    this.domManipulator.createObject("target");
    this.domManipulator.createObject("robot");
  }

  createObstacle() {
    this.domManipulator.createObject("obstacle", this.obstacleWidth, this.obstacleHeight)
  }

  async findPath() {
    await this.setTargetPosition();
    await this.setRobotPosition();
    await this.setObstacleParameters();
    const data = { id: 1, width: $("#map").width(), height: $("#map").height(), elementSize: this.domManipulator.elementSize, clearance: this.clearance }
    this.socketService.send("getPath", data);
  }

  setTargetPosition() {
    return new Promise(async (resolve) => {
      const coordinate = $("#target").position();
      const width = $("#target").width();
      const height = $("#target").height();
      const data = { id: 1, x: Math.round((coordinate.left + width / 2) / this.domManipulator.elementSize), y: Math.round((coordinate.top + height / 2) / this.domManipulator.elementSize) };
      await this.socketService.send("targetupdate", data);
      resolve(data);
    });
  }

  setRobotPosition() {
    return new Promise(async (resolve) => {

      let coordinate = $(".tri").position();
      let width = $(".tri").width();
      let height = $(".tri").height();
      if (!coordinate) {
        coordinate = $("#robot").position();
        width = $("#robot").width();
        height = $("#robot").height();
      }

      const data = { id: 1, x: Math.round((coordinate.left + width / 2) / this.domManipulator.elementSize), y: Math.round((coordinate.top + height / 2) / this.domManipulator.elementSize) };
      await this.socketService.send("robotupdate", data);
      resolve(data);
    });
  }

  setObstacleParameters() {
    return new Promise(async (resolve) => {
      const obstacles = document.getElementsByClassName("obstacle");
      const obstaclePositions = [];
      for (let i = 0; i < obstacles.length; i++) {
        obstaclePositions.push(await getObstacleParameter(obstacles[i]));
      }
      const obstacleParameters = obstaclePositions
      await this.socketService.send("obstacleupdate", { id: 1, obstacleParameters });
      resolve(obstaclePositions);

      function getObstacleParameter(obstacle) {
        return new Promise((resolve) => {
          const obstacleParameter = { position: { x: $(obstacle).position().left, y: $(obstacle).position().top }, size: { width: $(obstacle).width(), height: $(obstacle).height() } };
          resolve(obstacleParameter);
        });
      }
    });
  }

  async setAnchorPosition(x0: number, x1: number, x2: number, y0: number, y1: number, y2: number) {
    await this.socketService.send("anchorPositionUpdate", { id: "AN0", x: x0, y: y0 });
    await this.socketService.send("anchorPositionUpdate", { id: "AN1", x: x1, y: y1 });
    this.socketService.send("anchorPositionUpdate", { id: "AN2", x: x2, y: y2 });
  }
}
