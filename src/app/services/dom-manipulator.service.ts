import { Injectable } from '@angular/core';
import { Grid, DijkstraFinder } from 'pathfinding';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class DomManipulatorService {

  constructor() { }

  createMap(width, height) {
    const map = document.getElementById("map");
    for (let i = 0; i < width * height; i++) {
      let grid = document.createElement("div");
      grid.className = "grid";
      map.appendChild(grid);
    }
  }

  createObstacle(width, height) {
    let mousePosition;
    let offset = [0, 0];
    let div;
    let isDown = false;

    div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.background = "#3f3f3f";
    div.className = "obstacle";
    div.ondblclick = doAttack;
    function doAttack() {
      this.remove();
    }
    const map = document.getElementById("map");
    map.appendChild(div);

    div.addEventListener('mousedown', (e) => {
      isDown = true;
      offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
      ];
    }, true);

    document.addEventListener('mouseup', () => {
      isDown = false;
    }, true);

    document.addEventListener('mousemove', (event) => {
      event.preventDefault();
      if (isDown) {
        mousePosition = {

          x: event.clientX,
          y: event.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top = (mousePosition.y + offset[1]) + 'px';
      }
    }, true);
  }

  createStartPoint() {
    let mousePosition;
    let offset = [0, 0];
    let div;
    let isDown = false;

    div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "0px";
    div.style.bottom = "0px";
    div.style.width = "20px";
    div.style.height = "20px";
    div.style.background = "red";
    div.style.borderRadius = "50%";
    div.className = "start";
    const map = document.getElementById("map");
    map.appendChild(div);

    div.addEventListener('mousedown', (e) => {
      isDown = true;
      offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
      ];
    }, true);

    document.addEventListener('mouseup', () => {
      isDown = false;
    }, true);

    document.addEventListener('mousemove', (event) => {
      event.preventDefault();
      if (isDown) {
        mousePosition = {

          x: event.clientX,
          y: event.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top = (mousePosition.y + offset[1]) + 'px';
      }
    }, true);
  }
  createEndPoint() {
    let mousePosition;
    let offset = [0, 0];
    let div;
    let isDown = false;

    div = document.createElement("div");
    div.style.position = "absolute";
    div.style.right = "0px";
    div.style.top = "0px";
    div.style.width = "20px";
    div.style.height = "20px";
    div.style.background = "blue";
    div.style.borderRadius = "50%";
    div.className = "end";
    const map = document.getElementById("map");
    map.appendChild(div);

    div.addEventListener('mousedown', (e) => {
      isDown = true;
      offset = [
        div.offsetLeft - e.clientX,
        div.offsetTop - e.clientY
      ];
    }, true);

    document.addEventListener('mouseup', () => {
      isDown = false;
    }, true);

    document.addEventListener('mousemove', (event) => {
      event.preventDefault();
      if (isDown) {
        mousePosition = {

          x: event.clientX,
          y: event.clientY

        };
        div.style.left = (mousePosition.x + offset[0]) + 'px';
        div.style.top = (mousePosition.y + offset[1]) + 'px';
      }
    }, true);
  }
}
