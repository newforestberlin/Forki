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
    div.style.left = "10px";
    div.style.bottom = "10px";
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
    div.style.right = "10px";
    div.style.top = "10px";
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

  createAnchorPoints(anchor, left, top, radius) {
    if (!document.getElementById(anchor)) {
      let div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = left + "px";
      div.style.top = top + "px";
      div.className = "anchor";
      div.id = anchor;
      const map = document.getElementById("map");
      map.appendChild(div);
    } else {
      let  anchorPosition = document.getElementById(anchor);
      anchorPosition.style.left = left + "px";
      anchorPosition.style.top = top + "px";
    }
    if (!document.getElementById(anchor + "Radius")) {
      this.createAnchorRadius(anchor, left, top, radius);
    } else {
      this.updateAnchorRadius(anchor, left, top, radius);
    }
  }

  updateAnchorRadius(anchor, left, top, radius) {
    let circle = document.getElementById(anchor + "Radius")
    circle.style.left = left - radius * 430 + "px";
    circle.style.top = top - radius * 430 + "px";
    circle.style.padding = radius * 430 + "px";
  }

  createAnchorRadius(anchor, left, top, radius) {
    let circle = document.createElement("div");
    circle.style.left = left - radius * 430 + "px";
    circle.style.top = top - radius * 430 + "px";
    circle.style.padding = radius * 430 + "px";
    circle.id = anchor + "Radius";
    circle.className = "circle";
    const map = document.getElementById("map");
    map.appendChild(circle);
  }
}
