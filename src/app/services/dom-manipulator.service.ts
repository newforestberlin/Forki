import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomManipulatorService {
  obstacleNumber = 0;
  sizeFactor = 384;

  constructor() { }

  createObstacle(width, height) {
    let mousePosition;
    let offset = [0, 0];
    let isDown = false;

    const div = document.createElement("div");
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
    radius *= this.sizeFactor - 25;
    left *= this.sizeFactor - 25;
    top = 750 - (top * this.sizeFactor);
    if (!document.getElementById(anchor)) {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.left = left + "px";
      div.style.top = top + "px";
      div.className = "anchor";
      div.id = anchor;
      const map = document.getElementById("map");
      map.appendChild(div);
    } else {
      const anchorPosition = document.getElementById(anchor);
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
    const circle = document.getElementById(anchor + "Radius");
    circle.style.left = left - radius + "px";
    circle.style.top = top - radius + "px";
    circle.style.padding = radius + "px";
  }

  createAnchorRadius(anchor, left, top, radius) {
    const circle = document.createElement("div");
    circle.style.left = left - radius * this.sizeFactor - 25 + "px";
    circle.style.top = top - radius * this.sizeFactor - 25 + "px";
    circle.style.padding = radius * this.sizeFactor - 25 + "px";
    circle.id = anchor + "Radius";
    circle.className = "circle";
    const map = document.getElementById("map");
    map.appendChild(circle);
  }

  setTrilaterationPoint(pos) {
    // pos = JSON.parse(pos);
    if (pos.x != NaN && pos.x != null) {
      pos.x *= this.sizeFactor - 25;
      pos.y *= this.sizeFactor - 25;
      if (!document.getElementById("tri")) {
        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        div.className = "robot";
        div.id = "tri";
        const map = document.getElementById("map");
        map.appendChild(div);
      } else {
        const tri = document.getElementById("tri");
        tri.style.left = pos.x + "px";
        tri.style.top = pos.y + "px";

        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = pos.x + "px";
        div.style.top = pos.y + "px";
        div.className = "tri";
        const map = document.getElementById("map");
        map.appendChild(div);
      }
    }
  }
}
