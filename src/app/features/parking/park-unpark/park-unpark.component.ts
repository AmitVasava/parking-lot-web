import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParkVehicleDialogComponent } from '../park-vehicle-dialog/park-vehicle-dialog.component';
import { UnparkConfirmDialogComponent } from '../unpark-confirm-dialog/unpark-confirm-dialog.component';
import { ParkingStateService } from 'src/app/core/services/parking-state.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-park-unpark',
  templateUrl: './park-unpark.component.html'
})
export class ParkUnparkComponent {
  expandedSpot: string | null = null;
  floors$ = this.state.floors$;

  activeTickets$ = this.state.tickets$;
  closedTickets$ = this.state.closedTickets$;

  constructor(
    private dialog: MatDialog,
    public state: ParkingStateService,
    private notify: NotificationService
  ) { }

  toggleDetails(spotId: string) {
    this.expandedSpot = this.expandedSpot === spotId ? null : spotId;
  }

  onPark(floorId: string, spotId: string, allowedType: string) {
    const dialogRef = this.dialog.open(ParkVehicleDialogComponent, {
      width: '400px',
      data: { floorId, spotId, allowedType },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.vehicleNumber) {
        const ticket = this.state.parkVehicle(floorId, spotId, result.vehicleNumber);
        if (ticket) {
          this.notify.show(
            `Vehicle ${result.vehicleNumber} parked successfully (Ticket: ${ticket.ticketId})`
          );
        } else {
          //  Show warning toast for already occupied
          this.notify.show(`⚠ Spot ${spotId} on ${floorId} is already occupied.`, 'warning');
        }
      }
    });
  }

  onUnpark(floorId: string, spotId: string, vehicleNumber: string) {
    const dialogRef = this.dialog.open(UnparkConfirmDialogComponent, {
      width: '350px',
      data: { floorId, spotId, vehicleNumber },
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.state.unparkVehicle(floorId, spotId);
        const ticket = this.state.getTicketBySpot(floorId, spotId);
        if (ticket) this.state.removeTicket(ticket.ticketId);
        this.notify.show(`Vehicle ${vehicleNumber} unparked successfully.`);
      }
    });
  }
}
