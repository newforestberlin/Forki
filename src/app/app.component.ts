import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';
import { SocketListenerService } from './services/socket-listener.service';

@Component({
  selector: 'app-root',
  template: `<app-sidebar></app-sidebar>
            <app-header > </app-header>
            <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'forki-routing';
  constructor(private socketService: SocketService, private socketListener: SocketListenerService) { }

  ngOnInit() {
    this.socketListener.initIoConnection();
  }
}
