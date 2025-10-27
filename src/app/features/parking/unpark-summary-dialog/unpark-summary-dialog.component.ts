import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParkingTicket } from 'src/app/core/models/ticket.model';

@Component({
  selector: 'app-unpark-summary-dialog',
  templateUrl: './unpark-summary-dialog.component.html'
})
export class UnparkSummaryDialogComponent {
  duration = '';
  amount = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ticket: ParkingTicket },
    private dialogRef: MatDialogRef<UnparkSummaryDialogComponent>
  ) {
    const nowIso = new Date().toISOString();
    this.duration = this.calcDuration(data.ticket.parkedAt, nowIso);
    this.amount = this.calcPrice(data.ticket.parkedAt, nowIso, data.ticket.allowedType);
  }

  calcDuration(startIso: string, endIso: string): string {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const diffMs = end.getTime() - start.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    return hrs > 0 ? `${hrs}h ${rem}m` : `${mins}m`;
  }

  // Mock pricing (align with API later)
  calcPrice(startIso: string, endIso: string, type: string): number {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const hours = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)));
    switch (type) {
      case 'CAR': return hours * 20;
      case 'BIKE': return hours * 10;
      case 'TRUCK': return hours * 30;
      default: return hours * 15;
    }
  }

  confirmPayment() {
    this.dialogRef.close({ paid: true, amount: this.amount });
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
