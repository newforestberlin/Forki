import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { PathfinderService } from './pathfinder.service';

@Injectable({
    providedIn: 'root'
})
export class SocketListenerService {
    constructor(private http: HttpClient, private socketService: SocketService, private pathfinderService: PathfinderService
    ) { }

  initIoConnection(): void {
    this.socketService.initSocket();
    this.socketService.onMessage("getPath")
      .subscribe((path: any) => {
        this.pathfinderService.visualizePath(path);
      });
  }
}