import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {

  send: any;
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.initSocket();
  }

  public mouseUp() {
    clearInterval(this.send);
  }

  public mouseDown(direction) {
    console.log(direction)
    this.send = setInterval(() => this.setDirection(direction), 100);
  }

  setDirection(direction) {
    console.log(direction)
    this.socketService.send("setMovement", { direction: direction, time: 0.1 });
  }
}
