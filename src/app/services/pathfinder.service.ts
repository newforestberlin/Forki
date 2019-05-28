import { Injectable } from '@angular/core';
import { Grid, BiAStarFinder, BiBestFirstFinder } from 'pathfinding';
import * as $ from 'jquery';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class PathfinderService {

  width = 50;
  height = 50;
  grid = new Grid(this.width, this.height);

  constructor() {
  }

  async findPath() {
    const finder = new BiBestFirstFinder({
      allowDiagonal: true,
      dontCrossCorners: true
    });
    this.grid = new Grid(this.width, this.height);
    const startPosition: any = await this.getStartPosition();
    const startCoordinates = { x: (startPosition % this.width), y: Math.trunc(startPosition / this.width) };
    const destinationPosition: any = await this.getDestinationPosition();
    const destinationCoordinates = { x: (destinationPosition % this.width), y: Math.trunc(destinationPosition / this.width) };
    const unwalkable = await this.checkUnwalkable();
    await this.setUnwalkable(unwalkable);
    const path = finder.findPath(startCoordinates.x, startCoordinates.y, destinationCoordinates.x, destinationCoordinates.y, this.grid);
    this.visualizePath(path);
  }

  async getStartPosition() {
    return new Promise(async (resolve) => {
      const startPoint = document.getElementsByClassName("start");
      const gridArray = document.getElementsByClassName("grid");
      resolve(await this.compareOverlayPoint(startPoint, gridArray));
    });
  }

  async getDestinationPosition() {
    return new Promise(async (resolve) => {
      const destinationPoint = document.getElementsByClassName("end");
      const gridArray = document.getElementsByClassName("grid");
      resolve(await this.compareOverlayPoint(destinationPoint, gridArray));
    });
  }

  async checkUnwalkable() {
    return new Promise(async (resolve) => {
      const obstacleArray = document.getElementsByClassName("obstacle");
      const gridArray = document.getElementsByClassName("grid");
      resolve(await this.compareOverlayArray(obstacleArray, gridArray));
    });
  }

  async setUnwalkable(gridElements) {
    return new Promise(async (resolve) => {
      for (let z = 0; z < gridElements.length; z++) {
        const coordinates = await this.gridElementToCoordinateSystem(gridElements[z]);
        for (let i = 0; i < coordinates.length; i++) {
          this.grid.setWalkableAt(coordinates[i].x, coordinates[i].y, false);
        }
      }
      resolve();
    });
  }

  gridElementToCoordinateSystem(grid) {
    // using the point of the left top corner
    // const grid = x - 1 + y * width
    return new Promise(async (resolve) => {
      const coordinates: any[] = [
        { x: (grid % this.width), y: Math.trunc(grid / this.width) }, // left top
        { x: (grid % this.width + 1), y: Math.trunc(grid / this.width) }, // right top
        { x: (grid % this.width), y: Math.trunc(grid / this.width + 1) }, // left bottom
        { x: (grid % this.width + 1), y: Math.trunc(grid / this.width + 1) }]; // right bottom
      resolve(coordinates);
    });
  }

  visualizePath(path) {
    let pathString = "M";
    for (let i = 0; i < path.length; i++) {
      if (i === 1) {
        pathString += "S" + path[i][0] * 10 + " " + path[i][1] * 10 + ","
      } else {
        pathString += path[i][0] * 10 + " " + path[i][1] * 10 + ","
      }
    }
    $("#path").attr("d", pathString.slice(0, -1));
  }

  compareOverlayArray(objArray1, objArray2) {
    return new Promise(async (resolve) => {
      const overlayArray = [];
      for (let i = 0; i < objArray1.length; i++) {
        for (let gridNumber = 0; gridNumber < objArray2.length; gridNumber++) {
          const overlayPosition = await this.overlaps(objArray1[i], objArray2[gridNumber], gridNumber)
          if (overlayPosition !== false) {
            overlayArray.push(overlayPosition);
          }
        }
      }
      resolve(overlayArray);
    });
  }

  compareOverlayPoint(point, objArray2) {
    return new Promise(async (resolve) => {
      for (let gridNumber = 0; gridNumber < objArray2.length; gridNumber++) {
        const overlayPosition = await this.overlaps(point, objArray2[gridNumber], gridNumber)
        if (overlayPosition !== false) {
          resolve(overlayPosition);
        }
      }
    });
  }

  overlaps(obj1, obj2, gridNumber) {
    return new Promise((resolve) => {
      const obj1Pos = this.getPositions(obj1);
      const obj2Pos = this.getPositions(obj2);
      if (this.comparePositions(obj1Pos[0], obj2Pos[0]) && this.comparePositions(obj1Pos[1], obj2Pos[1]) === true) {
        resolve(gridNumber);
      } else {
        resolve(false);
      }
    });
  }

  getPositions(element) {
    let pos;
    let width;
    let height;
    pos = $(element).position();
    width = $(element).width();
    height = $(element).height();
    return [[pos.left, pos.left + width], [pos.top, pos.top + height]];
  }

  comparePositions(obj1Pos, obj2Pos) {
    let result1;
    let result2;
    result1 = obj1Pos[0] < obj2Pos[0] ? obj1Pos : obj2Pos;
    result2 = obj1Pos[0] < obj2Pos[0] ? obj2Pos : obj1Pos;
    return result1[1] > result2[0] || result1[0] === result2[0];
  }
}

