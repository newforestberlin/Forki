import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from "@angular/common/http";
import { SocketService } from './socket.service';

interface Coordinate {
  x: number;
  y: number
}
@Injectable({
  providedIn: 'root'
})
export class PathfinderService {
  width = 525;
  height = 525;
  elementSize = 5;
  clearance = 10;

  constructor(private http: HttpClient, private socketService: SocketService
  ) { }

  setMapSize(width, height) {
    this.width = width;
    this.height = height;
    $(":root").css("--mapWidth", this.width + "px");
    $(":root").css("--mapHeight", this.height + "px");
  }

  async findPath() {
    await this.setTargetPosition();
    await this.setRobotPosition();
    await this.setObstacleParameters();
    const data = { id: 1, width: this.width, height: this.height, elementSize: this.elementSize, clearance: this.clearance }
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
      const coordinate = $("#start").position();
      const width = $("#start").width();
      const height = $("#start").height();
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

  async getAnchorParameters() {
    setInterval(async () => {
      await this.socketService.send("anchorParameters", { id: "AN0" });
      await this.socketService.send("anchorParameters", { id: "AN1" });
      await this.socketService.send("anchorParameters", { id: "AN2" });
    }, 1000)
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

