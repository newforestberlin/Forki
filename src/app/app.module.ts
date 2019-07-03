import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PathfinderComponent } from './components/pathfinder/pathfinder.component';
import { SocketService } from './services/socket.service';
import { MovementComponent } from './components/movement/movement.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './screens/home/home.component';
import { SonarComponent } from './components/sonar/sonar.component';

@NgModule({
  declarations: [
    AppComponent,
    PathfinderComponent,
    MovementComponent,
    MapComponent,
    HomeComponent,
    SonarComponent
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
