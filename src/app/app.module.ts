import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathfinderComponent } from './pathfinder/pathfinder.component';
import { SocketService } from './services/socket.service';
import { MovementComponent } from './movement/movement.component';

@NgModule({
  declarations: [
    AppComponent,
    PathfinderComponent,
    MovementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
