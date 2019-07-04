import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class DomManipulatorService {
  obstacleNumber = 0;
  width = 525;
  height = 600;
  scaleX = 1;
  scaleY = 1;
  sweepRotation = 0;
  constructor() { }


  setMapSize(width, height) {
    this.width = width;
    this.height = height;
    $(":root").css("--mapWidth", this.width + "px");
    $(":root").css("--mapHeight", this.height + "px");
  }

  createObject(name, width?, height?) {
    let mousePosition;
    let offset = [0, 0];
    let div;
    let isDown = false;

    div = document.createElement("div");
    div.className = name;
    div.id = name;

    // for obstacle only
    if (name === "obstacle") {
      div.style.width = width + "px";
      div.style.height = height + "px";
      this.obstacleNumber++;
      div.ondblclick = deleteObstacle;
    }
    function deleteObstacle() {
      this.remove();
    }
    // obstacle end

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
        if (mousePosition.x > 188 && mousePosition.x < 188 + this.width) {
          div.style.left = (mousePosition.x + offset[0]) + 'px';
        }
        if (mousePosition.y > 90 && mousePosition.y < 90 + this.height) {
          div.style.top = (mousePosition.y + offset[1]) + 'px';
        }
      }
    }, true);
  }

  createAnchorPoints(anchor, left, top, radius, scaleX, scaleY) {
    this.scaleX = scaleX;
    this.scaleY = scaleY;
    top *= this.height / scaleY - 25;
    this.width = Math.round(this.height * scaleX / scaleY);
    left *= this.width / scaleX - 25;
    this.setMapSize(this.width, this.height);
    radius *= this.height / scaleY;

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
    circle.style.left = left - radius * this.height / this.scaleY - 25 + "px";
    circle.style.top = top - radius * this.height / this.scaleY - 25 + "px";
    circle.style.padding = radius * this.height / this.scaleY - 25 + "px";
    circle.id = anchor + "Radius";
    circle.className = "circle";
    const map = document.getElementById("map");
    map.appendChild(circle);
  }

  setTrilaterationPoint(pos) {
    // pos = JSON.parse(pos);
    if (!isNaN(pos.x) && pos.x != null) {
      pos.x *= this.height / this.scaleY;
      pos.y *= this.height / this.scaleY;
      if (!document.getElementById("tri")) {
        let div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = pos.x - 20 + "px";
        div.style.top = pos.y - 20 + "px";
        div.className = "robot";
        div.id = "tri";
        const map = document.getElementById("map");
        map.appendChild(div);
      } else {
        const tri = document.getElementById("tri");
        tri.style.left = pos.x - 20 + "px";
        tri.style.top = pos.y - 20 + "px";

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

  visualizePath(path, elementSize) {
    let pathString = "M ";
    for (let i = 0; i < path.length; i++) {
      if (i === 1) {
        pathString += "S " + path[i][0] * elementSize + " " + path[i][1] * elementSize + ","
      } else {
        pathString += path[i][0] * elementSize + " " + path[i][1] * elementSize + ","
      }
    }
    pathString = pathString.slice(0, -1);
    $("#path").attr("d", pathString);
  }

  setSonarSweep(sonar, position) {
    this.sweepRotation = sonar.deg;
    if (position === "front") {
      this.setSonarDistPoint(sonar.dist, sonar.deg);
      $("#sweep-front").css({ 'transform': 'rotate(' + this.sweepRotation + 'deg)' });
    } else if (position === "back") {
      this.setSonarDistPoint(sonar.dist, sonar.deg);
      $("#sweep-back").css({ 'transform': 'rotate(' + this.sweepRotation + 'deg)' });
    }
  }

  setSonarDistPoint(dist, deg) {
    const sonar = document.getElementById("sonar");
    const sonarContainer = document.createElement("div");
    sonarContainer.className = "sonar-container";
    sonarContainer.style.transform = "rotate(" + this.sweepRotation + "deg)";
    sonar.appendChild(sonarContainer);
    const obstacle = document.createElement("div");
    obstacle.className = "obstacle-sonar";
    if (dist < 30) {
      obstacle.style.top = 300 - dist * 10 + "px";
      sonarContainer.appendChild(obstacle);
    }
  }
}
