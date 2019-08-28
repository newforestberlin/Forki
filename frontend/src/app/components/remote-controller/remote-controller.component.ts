import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { timeout } from 'q';

@Component({
  selector: 'app-remote-controller',
  templateUrl: './remote-controller.component.html',
  styleUrls: ['./remote-controller.component.scss']
})
export class RemoteControllerComponent implements OnInit {

  send: any;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.wobble();
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
  }

  async wobble() {
    this.setDirection("turn left");
    this.setDirection("turn left");
    this.setDirection("turn left");
    this.setDirection("turn left");
    await this.timeOut(200);
    this.setDirection("turn right");
    this.setDirection("turn right");
    this.setDirection("turn right");
    await this.timeOut(200);
    this.setDirection("turn left");
    this.setDirection("turn left");
    this.setDirection("turn left");
    await this.timeOut(200);
    this.setDirection("turn right");
    this.setDirection("turn right");
    this.setDirection("turn right");
    await this.timeOut(200);
    this.setDirection("turn left");
    this.setDirection("turn left");
    this.setDirection("turn left");
    await this.timeOut(200);
    this.setDirection("turn right");
    this.setDirection("turn right");
    this.setDirection("turn right");
    await this.timeOut(200);
    this.setDirection("forwards");
    this.setDirection("forwards");
    this.setDirection("forwards");
    await this.timeOut(200);
    this.setDirection("backwards");
    this.setDirection("backwards");
    this.setDirection("backwards");
    await this.timeOut(200);
    this.setDirection("left");
    this.setDirection("left");
    this.setDirection("left");
    await this.timeOut(200);
    this.setDirection("right");
    this.setDirection("right");
    this.setDirection("right");
    await this.timeOut(200);
    this.setDirection("right");
    this.setDirection("right");
    this.setDirection("right");
    await this.timeOut(200);
    this.setDirection("left");
    this.setDirection("left");
    this.setDirection("left");
  }

  timeOut(timeout) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  }
}
