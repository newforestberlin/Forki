import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from "@angular/common/http";
import { DatabaseService } from './database.service';

interface Coordinate {
  x: number;
  y: number
}
@Injectable({
  providedIn: 'root'
})
export class PathfinderService {
  width = 700;
  height = 500;
  elementSize = 5;
  clearance = 10;

  constructor(private http: HttpClient, private databaseService: DatabaseService
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
    const path = await this.databaseService.getPath(this.width, this.height, this.elementSize, this.clearance);
    this.visualizePath(path);
  }

  setTargetPosition() {
    return new Promise(async (resolve) => {
      const coordinate = $("#target").position();
      const width = $("#target").width();
      const height = $("#target").height();
      const position = { x: Math.round((coordinate.left + width / 2) / this.elementSize), y: Math.round((coordinate.top + height / 2) / this.elementSize) };
      await this.databaseService.setTargetPosition(position);
      resolve(position);
    });
  }

  setRobotPosition() {
    return new Promise(async (resolve) => {
      const coordinate = $("#start").position();
      const width = $("#start").width();
      const height = $("#start").height();
      const position = { x: Math.round((coordinate.left + width / 2) / this.elementSize), y: Math.round((coordinate.top + height / 2) / this.elementSize) };
      await this.databaseService.setRobotPosition(position);
      resolve(position);
    });
  }

  setObstacleParameters() {
    return new Promise(async (resolve) => {
      const obstacles = document.getElementsByClassName("obstacle");
      const obstaclePositions = [];
      for (let i = 0; i < obstacles.length; i++) {
        obstaclePositions.push(await getObstacleParameter(obstacles[i]));
      }
      this.databaseService.setObstacleParameters(obstaclePositions);
      resolve(obstaclePositions);

      function getObstacleParameter(obstacle) {
        return new Promise((resolve) => {
          const obstacleParameter = { position: { x: $(obstacle).position().left, y: $(obstacle).position().top }, size: { width: $(obstacle).width(), height: $(obstacle).height() } };
          resolve(obstacleParameter);
        });
      }
    });
  }

  getObstacleParameter() {
    return new Promise(async (resolve) => {
      return await this.databaseService.getObstacleParameters();
    });
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

