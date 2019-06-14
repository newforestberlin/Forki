import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { PathfinderService } from './pathfinder.service';
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
        this.pathfinderService.visualizePath(path);
      });
    this.socketService.onMessage("anchorParameters")
      .subscribe((anchorParameters: any) => {
        for (let i = 0; i < anchorParameters.result.length; i++) {
          const id = anchorParameters.result[i].anchor;
          const x = JSON.parse(anchorParameters.result[i].data).x;
          const y = JSON.parse(anchorParameters.result[i].data).y;
          const dist = JSON.parse(anchorParameters.result[i].data).dist;
          this.domManipulator.createAnchorPoints(id, x, y, dist);
        }
        this.socketService.send("realtimeRobot", "send");
      });
    this.socketService.onMessage("realtimeRobot").subscribe(position => {
      console.log(position);
      this.domManipulator.setTrilaterationPoint(position.position);
    });
  }
}
