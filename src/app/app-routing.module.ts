import { NgModule } from '@angular/core';
import { HomeComponent } from './screens/home/home.component';
import { MovementComponent } from './components/movement/movement.component';
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
