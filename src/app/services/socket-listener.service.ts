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
        console.log(anchorParameters.result);
        this.domManipulator.createAnchorPoints(anchorParameters.result.id, anchorParameters.result.data.x, anchorParameters.result.data.y, anchorParameters.result.data.dist);
      });
  }
}