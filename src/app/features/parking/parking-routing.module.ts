import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkUnparkComponent } from './park-unpark/park-unpark.component';

const routes: Routes = [
  { path: 'park-unpark', component: ParkUnparkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkingRoutingModule { }
