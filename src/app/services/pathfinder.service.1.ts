import { Injectable } from '@angular/core';
import { Grid, BiAStarFinder, BiBDijstraFinder, BiBestFirstFinder } from 'pathfinding';
import * as $ from 'jquery';
import { HttpClient } from "@angular/common/http";

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
  elementSize = 2;
  clearance = 10;
  grid = new Grid(this.width / this.elementSize, this.height / this.elementSize);
  finder = new BiAStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
  });
  constructor(private http: HttpClient
  ) { }

  setMapSize(width, height) {
    this.width = width;
    this.height = height;
    $(":root").css("--mapWidth", this.width + "px");
    $(":root").css("--mapHeight", this.height + "px");
  }

  async findPath() {
    this.grid = new Grid(this.width / this.elementSize, this.height / this.elementSize);
    const start = await this.getPosition("start");
    const end = await this.getPosition("end");
    const unwalkables = await this.getUnwalkables();
    await this.setUnwalkables(unwalkables);
    const path = this.finder.findPath(start.x, start.y, end.x, end.y, this.grid);
    this.visualizePath(path);
  }

  getRobotPosition() {
    return new Promise((resolve) => {
    this.http.get<any[]>("http://localhost:3000/robotposition")
      .subscribe(start => {
        resolve(start);
      });
    });
  }

  getTargetPosition() {
    return new Promise((resolve) => {
    this.http.get<any[]>("http://localhost:3000/targetposition")
      .subscribe(start => {
        resolve(start);
      });
    });
  }




  getPosition(element) {
    return new Promise((resolve) => {
      const coordinate = $("#" + element).position();
      const width = $("#" + element).width();
      const height = $("#" + element).height();
      const position = { x: Math.round((coordinate.left + width / 2) / this.elementSize), y: Math.round((coordinate.top + height / 2) / this.elementSize) };
      resolve(position);
    });
  }

  setUnwalkables(unwalkables) {
    return new Promise((resolve) => {
      for (let i = 0; i < unwalkables.length; i++) {
        if (unwalkables[i].x >= 0 && unwalkables[i].y >= 0) {
          this.grid.setWalkableAt(unwalkables[i].x, unwalkables[i].y, false);
        }
      }
      resolve();
    });
  }

  async getUnwalkables() {
    return new Promise(async (resolve) => {
      const obstacleParameters = await this.getObstacleParameter();
      console.log(obstacleParameters);
      let unwalkables = [];
      for (let i = 0; i < obstacleParameters.length; i++) {
        unwalkables.push(await this.getUnwalkable(obstacleParameters[i]));
      }
      unwalkables = [].concat.apply([], unwalkables);
      resolve(unwalkables);
    });
  }

  getObstacleParameter() {
    return new Promise(async (resolve) => {
      const obstacles = document.getElementsByClassName("obstacle");
      const obstaclePositions = [];
      for (let i = 0; i < obstacles.length; i++) {
        obstaclePositions.push(await this.getObstaclePosition(obstacles[i]));
      }
      resolve(obstaclePositions);
    });
  }

  getUnwalkable(obstacleParameter) {
    return new Promise(async (resolve) => {
      const width = obstacleParameter.size.width / this.elementSize + this.clearance;
      const height = obstacleParameter.size.height / this.elementSize + this.clearance;
      const xOffset = obstacleParameter.position.left / this.elementSize - this.clearance / 2;
      const yOffset = obstacleParameter.position.top / this.elementSize - this.clearance / 2;
      const unwalkable = [];
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          unwalkable.push({ x: Math.round(xOffset + x), y: Math.round(yOffset + y) });
        }
      }
      resolve(unwalkable);
    });
  }



  getObstaclePosition(obstacle) {
    return new Promise((resolve) => {
      const obstacleParameter = { position: $(obstacle).position(), size: { width: $(obstacle).width(), height: $(obstacle).height() } };
      resolve(obstacleParameter);
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

