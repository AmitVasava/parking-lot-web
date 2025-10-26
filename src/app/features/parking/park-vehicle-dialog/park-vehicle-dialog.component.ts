import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-park-vehicle-dialog',
  templateUrl: './park-vehicle-dialog.component.html'
})
export class ParkVehicleDialogComponent {
  vehicleNumber: string = '';
  ticketId: string;
  parkedAt: string;

  constructor(
    public dialogRef: MatDialogRef<ParkVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ticketId = this.generateTicketId();
    this.parkedAt = this.getCurrentDateTime();
  }

  private generateTicketId(): string {
    return 'T' + Math.floor(100000 + Math.random() * 900000).toString();
  }

  private getCurrentDateTime(): string {
    return new Date().toISOString().slice(0, 16); // 'yyyy-MM-ddTHH:mm'
  }

  onSubmit() {
    this.dialogRef.close({
      vehicleNumber: this.vehicleNumber,
      ticketId: this.ticketId,
      parkedAt: this.parkedAt
    });
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
