import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomManipulatorService {
  obstacleNumber = 0;
  constructor() { }

  createMap() {
    /* const map = document.getElementById("map");
     for (let i = 0; i < width * height; i++) {
      let grid = document.createElement("div");
      grid.className = "grid";
      map.appendChild(grid);
    } */
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
    div.style.borderRadius = "5px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.background = "#3f3f3f";
    div.className = "obstacle";
    div.id = "obstacle";
    this.obstacleNumber++;
    div.ondblclick = deleteObstacle;
    function deleteObstacle() {
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
    div.id = "start";
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
  createTargetPoint() {
    let mousePosition;
    let offset = [0, 0];
    let div;
    let isDown = false;

    div = document.createElement("div");
    div.style.position = "absolute";
    div.style.right = "0px";
    div.style.top = "0px";
    div.id = "target";
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
