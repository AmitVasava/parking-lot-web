import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorSpotGridComponent } from './components/floor-spot-grid/floor-spot-grid.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    ToastComponent,
    FloorSpotGridComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastComponent,
    FloorSpotGridComponent
  ]
})
export class SharedModule {}
