import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ParkingRoutingModule } from './parking-routing.module';
import { ParkUnparkComponent } from './park-unpark/park-unpark.component';
import { ParkVehicleDialogComponent } from './park-vehicle-dialog/park-vehicle-dialog.component';
import { UnparkConfirmDialogComponent } from './unpark-confirm-dialog/unpark-confirm-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ParkUnparkComponent,
    ParkVehicleDialogComponent,
    UnparkConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    ParkingRoutingModule,
    MatFormFieldModule,
    SharedModule
  ]
})
export class ParkingModule { }
