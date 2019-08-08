import { NgModule } from '@angular/core';
import { HomeComponent } from './screens/home/home.component';
import { MovementComponent } from './components/movement/movement.component';
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
    component: MovementComponent,
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
