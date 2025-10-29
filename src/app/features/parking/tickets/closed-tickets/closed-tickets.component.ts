import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ParkingTicket } from 'src/app/core/models/ticket.model';
import { Invoice } from 'src/app/core/models/invoice.model';

@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html'
})
export class ClosedTicketsComponent {
  @Input() tickets: ParkingTicket[] | null = [];
  @Input() invoices: Invoice[] | null = [];
  @Output() viewInvoice = new EventEmitter<Invoice>();

  openInvoice(ticket: ParkingTicket) {
    const inv = this.invoices?.find(i => i.ticket.ticketId === ticket.ticketId);
    if (inv) this.viewInvoice.emit(inv);
  }

  duration(startIso?: string, endIso?: string): string {
    if (!startIso || !endIso) return '-';
    const start = new Date(startIso), end = new Date(endIso);
    const mins = Math.floor((end.getTime() - start.getTime()) / 60000);
    const h = Math.floor(mins / 60), m = mins % 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  }

  hasInvoice(ticket: ParkingTicket): boolean {
    return !!this.invoices?.some(i => i.ticket.ticketId === ticket.ticketId);
  }
}
