import { NgModule } from '@angular/core';
import { HomeComponent } from './screens/home/home.component';
import { RemoteControllerComponent } from './components/remote-controller/remote-controller.component';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { SonarComponent } from './components/sonar/sonar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }, {
    path: 'map',
    component: MapComponent,
  }, {
    path: 'controller',
    component: RemoteControllerComponent,
  }, {
    path: 'sonar',
    component: SonarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
