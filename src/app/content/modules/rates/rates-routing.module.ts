import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatesComponent } from './rates/rates.component';

const routes: Routes = [
  {
    path: 'rates',
    component: RatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RatesRoutingModule { }
