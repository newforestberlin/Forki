import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { PathfinderService } from './map.service';
import { DomManipulatorService } from './dom-manipulator.service';

@Injectable({
  providedIn: 'root'
})
export class SocketListenerService {
  counter = 0;
  constructor(private http: HttpClient, private socketService: SocketService, private pathfinderService: PathfinderService, private domManipulator: DomManipulatorService
  ) { }

  initIoConnection(): void {
    this.socketService.initSocket();
    this.socketService.onMessage("getPath")
      .subscribe((path: any) => {
        this.domManipulator.visualizePath(path, this.pathfinderService.elementSize);
      });

    this.socketService.onMessage("getAnchorParameters")
      .subscribe((anchorParameters: any) => {
        this.anchorParameter(anchorParameters);
        this.socketService.send("getDatabaseRobotPosition", "placeholder");
      });

    this.socketService.onMessage("getDatabaseRobotPosition").subscribe(position => {
      this.domManipulator.setTrilaterationPoint(position.position);
    });

    this.socketService.onMessage("getSonarParameter").subscribe(sonar => {
      this.domManipulator.setSonarSweep(sonar.sonar.back);
    });

    // DWM1001 calculated robot Position
    // this.socketService.onMessage("getRobotPosition").subscribe(position => {
    //   this.domManipulator.setTrilaterationPoint(position.position);
    // });
  }

  anchorParameter(anchorParameters) {
    let scaleX = Math.abs(anchorParameters[0].data.x - anchorParameters[1].data.x);
    let scaleY = Math.abs(anchorParameters[0].data.y - anchorParameters[1].data.y);

    if (scaleX === 0) {
      scaleX = Math.abs(anchorParameters[0].data.x - anchorParameters[2].data.x);
    }
    if (scaleY === 0) {
      scaleY = Math.abs(anchorParameters[0].data.y - anchorParameters[2].data.y);
    }

    for (let i = 0; i < anchorParameters.length; i++) {
      const id = anchorParameters[i].anchor;
      const x = anchorParameters[i].data.x;
      const y = anchorParameters[i].data.y;
      const dist = anchorParameters[i].data.dist;
      this.domManipulator.createAnchorPoints(id, x, y, dist, scaleX, scaleY);
    }
  }
}
