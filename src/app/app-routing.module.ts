import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { PathfinderComponent } from './pathfinder/pathfinder.component';
import { MovementComponent } from './movement/movement.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }, {
    path: 'movement',
    component: MovementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
