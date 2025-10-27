import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Shared components
import { FloorSpotGridComponent } from './components/floor-spot-grid/floor-spot-grid.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    FloorSpotGridComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    // components
    FloorSpotGridComponent,
    ToastComponent,
    // re-export common modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
