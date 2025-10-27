import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ParkingRoutingModule } from './parking-routing.module';
import { ParkUnparkComponent } from './park-unpark/park-unpark.component';
import { ParkVehicleDialogComponent } from './park-vehicle-dialog/park-vehicle-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UnparkSummaryDialogComponent } from './unpark-summary-dialog/unpark-summary-dialog.component';
import { InvoiceDialogComponent } from './invoice-dialog/invoice-dialog.component';

@NgModule({
  declarations: [
    ParkUnparkComponent,
    ParkVehicleDialogComponent,
    UnparkSummaryDialogComponent,
    InvoiceDialogComponent 
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
