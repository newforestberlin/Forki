import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-sidebar></app-sidebar>
            <app-header > </app-header>
            <router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'forki-routing';
}
