import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParkingFloor } from '../models/floor.model';
import { ParkingTicket } from '../models/ticket.model';
import { ParkingSpot } from '../models/spot.model';
import { Invoice } from '../models/invoice.model';

@Injectable({ providedIn: 'root' })
export class ParkingStateService {
  // ---------- Floors ----------
  private _floors = new BehaviorSubject<ParkingFloor[]>([
    {
      floorId: 'Floor1',
      spots: [
        { spotId: 'F1S1', allowedType: 'CAR', occupied: false },
        { spotId: 'F1S2', allowedType: 'BIKE', occupied: false },
        { spotId: 'F1S3', allowedType: 'TRUCK', occupied: false },
      ],
    },
    {
      floorId: 'Floor2',
      spots: [
        { spotId: 'F2S1', allowedType: 'CAR', occupied: false },
        { spotId: 'F2S2', allowedType: 'BIKE', occupied: false },
      ],
    },
  ]);
  floors$ = this._floors.asObservable();

  // ---------- Tickets ----------
  private _tickets = new BehaviorSubject<ParkingTicket[]>([]);
  tickets$ = this._tickets.asObservable();

  private _closedTickets = new BehaviorSubject<ParkingTicket[]>([]);
  closedTickets$ = this._closedTickets.asObservable();

  // ---------- Invoices ----------
  private _invoices = new BehaviorSubject<Invoice[]>([]);
  invoices$ = this._invoices.asObservable();

  get floors(): ParkingFloor[] {
    return this._floors.value;
  }

  // -------- Floors management --------
  addFloor(floorId: string) {
    if (this.floors.some(f => f.floorId === floorId)) return;
    const updated = [...this.floors, { floorId, spots: [] }];
    this._floors.next(updated);
  }

  addSpot(floorId: string, spot: ParkingSpot) {
    const updated = this.floors.map(f =>
      f.floorId === floorId ? { ...f, spots: [...f.spots, spot] } : f
    );
    this._floors.next(updated);
  }

  // -------- Parking operations --------
  parkVehicle(floorId: string, spotId: string, vehicleNumber: string) {
    const existing = this._tickets.value.find(
      t => t.floorId === floorId && t.spotId === spotId
    );
    if (existing) return null;

    // Update floors → occupied
    const updatedFloors = this.floors.map(floor => ({
      ...floor,
      spots: floor.spots.map(spot =>
        spot.spotId === spotId && floor.floorId === floorId
          ? { ...spot, occupied: true }
          : spot
      ),
    }));
    this._floors.next(updatedFloors);

    // Create and store ticket
    const ticket: ParkingTicket = {
      ticketId: this.generateTicketId(),
      floorId,
      spotId,
      vehicleNumber,
      allowedType: this.getAllowedType(floorId, spotId),
      parkedAt: new Date().toISOString(),
    };

    this.addTicket(ticket);
    return ticket;
  }

  unparkVehicle(floorId: string, spotId: string, fee?: number, paymentMode: string = 'Cash') {
    const floors = [...this.floors];
    const floor = floors.find(f => f.floorId === floorId);
    const spot = floor?.spots.find(s => s.spotId === spotId);
    if (!spot) return;

    const tickets = [...this._tickets.value];
    const idx = tickets.findIndex(t => t.floorId === floorId && t.spotId === spotId);
    if (idx === -1) return;

    const baseTicket = tickets[idx];

    // Close ticket
    const closedTicket: ParkingTicket = {
      ...baseTicket,
      unparkedAt: new Date().toISOString(),
      fee: typeof fee === 'number' ? fee : this.calculateDefaultFee(baseTicket.allowedType, baseTicket.parkedAt),
    };

    // Generate invoice (composition)
    const invoice: Invoice = {
      id: this.generateInvoiceId(),
      ticket: closedTicket,
      totalAmount: closedTicket.fee ?? 0,
      generatedAt: new Date().toISOString(),
      duration: this.calculateDuration(closedTicket.parkedAt, closedTicket.unparkedAt!),
      status: 'PAID',
    };

    // Update state
    spot.occupied = false;
    const updatedTickets = tickets.filter(t => t.ticketId !== closedTicket.ticketId);

    this._tickets.next(updatedTickets);
    this._closedTickets.next([...this._closedTickets.value, closedTicket]);
    this._floors.next(floors);
    this._invoices.next([...this._invoices.value, invoice]);

    return invoice;
  }

  // -------- Helpers --------
  addTicket(ticket: ParkingTicket) {
    this._tickets.next([...this._tickets.value, ticket]);
  }

  getTicketBySpot(floorId: string, spotId: string): ParkingTicket | undefined {
    return this._tickets.value.find(t => t.floorId === floorId && t.spotId === spotId);
  }

  get closedTicketsSnapshot(): ParkingTicket[] {
    return this._closedTickets.value;
  }

  get invoicesSnapshot(): Invoice[] {
    return this._invoices.value;
  }

  private getAllowedType(floorId: string, spotId: string): string {
    const floor = this.floors.find(f => f.floorId === floorId);
    const spot = floor?.spots.find(s => s.spotId === spotId);
    return spot?.allowedType || 'UNKNOWN';
  }

  private generateTicketId(): string {
    return 'T-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }

  private generateInvoiceId(): string {
    return 'INV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  private calculateDefaultFee(type: string, startIso: string): number {
    const start = new Date(startIso);
    const end = new Date();
    const hours = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60)));
    switch (type) {
      case 'CAR': return hours * 20;
      case 'BIKE': return hours * 10;
      case 'TRUCK': return hours * 30;
      default: return hours * 15;
    }
  }

  private calculateDuration(startIso: string, endIso: string): string {
    const start = new Date(startIso);
    const end = new Date(endIso);
    const diffMs = end.getTime() - start.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    return hrs > 0 ? `${hrs}h ${rem}m` : `${mins}m`;
  }
}
