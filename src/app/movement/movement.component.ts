import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.scss']
})
export class MovementComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.initSocket();
  }

  async moveLeft() {
    await this.socketService.send("setMovement", { direction: "left", time: 1 });
  }

  async moveRight() {
    await this.socketService.send("setMovement", { direction: "right", time: 1 });

  }

  async moveForwards() {
    await this.socketService.send("setMovement", { direction: "forwards", time: 1 });
  }

  async moveBackwards() {
    await this.socketService.send("setMovement", { direction: "backwards", time: 1 });
  }

  async turnRight() {
    await this.socketService.send("setMovement", { direction: "turn right", time: 1 });

  }
  async turnLeft() {
    await this.socketService.send("setMovement", { direction: "turn left", time: 1 });

  }
}
