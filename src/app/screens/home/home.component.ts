import { Component, OnInit } from '@angular/core';
import { SocketListenerService } from '../../services/socket-listener.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor( private socketListenerService: SocketListenerService) { }

  ngOnInit() {
    this.socketListenerService.initIoConnection();
  }

}
