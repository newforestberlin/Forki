import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-remote-controller',
  templateUrl: './remote-controller.component.html',
  styleUrls: ['./remote-controller.component.scss']
})
export class RemoteControllerComponent implements OnInit {

  send: any;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.initSocket();
  }

  public start() {
    this.send = setInterval(() => this.setDirection("forwards"), 100);
  }

  public mouseUp() {
    clearInterval(this.send);
  }

  public mouseDown(direction) {
    console.log(direction);
    this.send = setInterval(() => this.setDirection(direction), 100);
  }

  setDirection(direction) {
    this.socketService.send("setMovement", { direction, time: 0.1 });
  } y
}
