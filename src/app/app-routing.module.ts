import { NgModule } from '@angular/core';
import { PathfinderComponent } from './pathfinder/pathfinder.component';
import { MovementComponent } from './movement/movement.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PathfinderComponent,
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
