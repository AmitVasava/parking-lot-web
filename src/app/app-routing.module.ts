import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/floors', pathMatch: 'full' },
  {
    path: 'parking',
    loadChildren: () => import('./features/parking/parking.module').then(m => m.ParkingModule)
  },
  {
    path: 'floors',
    loadChildren: () => import('./features/floor-management/floor-management.module').then(m => m.FloorManagementModule)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
