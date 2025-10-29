import { Component, Input } from '@angular/core';
import { ParkingTicket } from 'src/app/core/models/ticket.model';

@Component({
  selector: 'app-active-tickets',
  templateUrl: './active-tickets.component.html'
})
export class ActiveTicketsComponent {
  @Input() tickets: ParkingTicket[] | null = [];
}
