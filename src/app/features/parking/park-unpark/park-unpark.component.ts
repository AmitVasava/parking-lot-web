import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkVehicleDialogComponent } from '../park-vehicle-dialog/park-vehicle-dialog.component';
import { UnparkSummaryDialogComponent } from '../unpark-summary-dialog/unpark-summary-dialog.component';
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component';
import { ParkingStateService } from 'src/app/core/services/parking-state.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Invoice } from 'src/app/core/models/invoice.model';

@Component({
  selector: 'app-park-unpark',
  templateUrl: './park-unpark.component.html'
})
export class ParkUnparkComponent {
  floors$ = this.state.floors$;
  activeTickets$ = this.state.tickets$;
  closedTickets$ = this.state.closedTickets$;
  invoices$ = this.state.invoices$;

  constructor(
    private dialog: MatDialog,
    private state: ParkingStateService,
    private notify: NotificationService
  ) { }

  onPark(floorId: string, spotId: string, allowedType: string) {
    const dialogRef = this.dialog.open(ParkVehicleDialogComponent, {
      width: '420px',
      data: { floorId, spotId, allowedType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.vehicleNumber) {
        const ticket = this.state.parkVehicle(floorId, spotId, result.vehicleNumber);
        if (ticket) {
          this.notify.show(`✅ Vehicle ${result.vehicleNumber} parked successfully (Ticket: ${ticket.ticketId})`);
        } else {
          this.notify.show(`⚠ Spot ${spotId} on ${floorId} is already occupied.`, 'warning');
        }
      }
    });
  }

  onUnpark(floorId: string, spotId: string, vehicleNumber?: string) {
    const ticket = this.state.getTicketBySpot(floorId, spotId);
    if (!ticket) return;

    const dialogRef = this.dialog.open(UnparkSummaryDialogComponent, {
      width: '420px',
      data: { ticket }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.paid) {
        const invoice = this.state.unparkVehicle(floorId, spotId, result.amount);
        this.notify.show(`🚗 Vehicle ${vehicleNumber ?? ''} unparked. Payment ₹${result.amount} received.`);

        if (invoice) {
          this.dialog.open(InvoiceDialogComponent, {
            width: '400px',
            data: { invoice }
          });
        }
      }
    });
  }

  /** Helper: Get invoice by ticket ID */
  getInvoiceByTicket(ticketId: string): Invoice | undefined {
    const invoices = this.state.invoicesSnapshot;
    return invoices.find(i => i.ticket.ticketId === ticketId);
  }

  /** Reusable dialog opener */
  openInvoiceDialog(invoice: Invoice) {
    this.dialog.open(InvoiceDialogComponent, {
      width: '400px',
      data: { invoice }
    });
  }
}
