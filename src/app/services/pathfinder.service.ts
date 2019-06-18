import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from "@angular/common/http";
import { SocketService } from './socket.service';
import { DomManipulatorService } from './dom-manipulator.service';

@Injectable({
  providedIn: 'root'
})
export class PathfinderService {
  elementSize = 5;
  clearance = 10;

  constructor(private http: HttpClient, private socketService: SocketService, private domService: DomManipulatorService
  ) { }

  async findPath() {
    await this.setTargetPosition();
    await this.setRobotPosition();
    await this.setObstacleParameters();
    const data = { id: 1, width: this.domService.width, height: this.domService.height, elementSize: this.elementSize, clearance: this.clearance }
    const path = await this.socketService.send("getPath", data);
  }

  setTargetPosition() {
    return new Promise(async (resolve) => {
      const coordinate = $("#target").position();
      const width = $("#target").width();
      const height = $("#target").height();
      const data = { id: 1, x: Math.round((coordinate.left + width / 2) / this.elementSize), y: Math.round((coordinate.top + height / 2) / this.elementSize) };
      await this.socketService.send("targetupdate", data);
      resolve(data);
    });
  }

  setRobotPosition() {
    return new Promise(async (resolve) => {
      const coordinate = $(".robot").position();
      const width = $(".robot").width();
      const height = $(".robot").height();
      const data = { id: 1, x: Math.round((coordinate.left + width / 2) / this.elementSize), y: Math.round((coordinate.top + height / 2) / this.elementSize) };
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
    await this.socketService.send("anchorPositionUpdate", { id: "5C2F", x: x0, y: y0 });
    await this.socketService.send("anchorPositionUpdate", { id: "0F8C", x: x1, y: y1 });
    this.socketService.send("anchorPositionUpdate", { id: "8182", x: x2, y: y2 });
  }

  async visualizePath(path) {
    let pathString = "M ";
    for (let i = 0; i < path.length; i++) {
      if (i === 1) {
        pathString += "S " + path[i][0] * this.elementSize + " " + path[i][1] * this.elementSize + ","
      } else {
        pathString += path[i][0] * this.elementSize + " " + path[i][1] * this.elementSize + ","
      }
    }
    pathString = pathString.slice(0, -1);
    console.log(pathString);
    $("#path").attr("d", pathString);
  }
}

