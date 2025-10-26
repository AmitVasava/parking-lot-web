import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParkingFloor } from '../models/floor.model';
import { ParkingTicket } from '../models/ticket.model';
import { ParkingSpot } from '../models/spot.model';

@Injectable({
  providedIn: 'root'
})
export class ParkingStateService {
  // ----------------------------
  // Reactive State Management
  // ----------------------------
  private _floors = new BehaviorSubject<ParkingFloor[]>([
    {
      floorId: 'Floor1',
      spots: [
        { spotId: 'F1S1', allowedType: 'CAR', occupied: false },
        { spotId: 'F1S2', allowedType: 'BIKE', occupied: false },
      ],
    },
    {
      floorId: 'Floor2',
      spots: [
        { spotId: 'F2S1', allowedType: 'CAR', occupied: false },
      ],
    },
  ]);
  floors$ = this._floors.asObservable();

  private _tickets = new BehaviorSubject<ParkingTicket[]>([]);
  tickets$ = this._tickets.asObservable();

  private _closedTickets = new BehaviorSubject<ParkingTicket[]>([]);
  closedTickets$ = this._closedTickets.asObservable();

  // ----------------------------
  // Accessor
  // ----------------------------
  get floors(): ParkingFloor[] {
    return this._floors.value;
  }

  // ----------------------------
  // Floor Management
  // ----------------------------
  addFloor(floorId: string) {
    const updated = [...this.floors, { floorId, spots: [] }];
    this._floors.next(updated);
  }

  addSpot(floorId: string, spot: ParkingSpot) {
    const updated = this.floors.map(f =>
      f.floorId === floorId ? { ...f, spots: [...f.spots, spot] } : f
    );
    this._floors.next(updated);
  }

  // ----------------------------
  // Parking Logic
  // ----------------------------
  parkVehicle(floorId: string, spotId: string, vehicleNumber: string) {
    // 🧠 Prevent double booking (important fix)
    const existing = this._tickets.value.find(
      t => t.floorId === floorId && t.spotId === spotId
    );
    if (existing) {
      console.warn(`⚠ Spot ${spotId} on ${floorId} is already occupied.`);
      return null; // 🚫 Return null to indicate failure
    }

    // ✅ Update spot occupancy
    const updatedFloors = this.floors.map(floor => ({
      ...floor,
      spots: floor.spots.map(spot =>
        spot.spotId === spotId && floor.floorId === floorId
          ? { ...spot, occupied: true }
          : spot
      ),
    }));
    this._floors.next(updatedFloors);

    // ✅ Generate and add new ticket
    const ticket: ParkingTicket = {
      ticketId: this.generateTicketId(),
      floorId,
      spotId,
      vehicleNumber,
      allowedType: this.getAllowedType(floorId, spotId),
      parkedAt: new Date().toLocaleString(),
    };

    this.addTicket(ticket);
    return ticket;
  }


  unparkVehicle(floorId: string, spotId: string) {
    const floors = [...this.floors];
    const floor = floors.find(f => f.floorId === floorId);
    const spot = floor?.spots.find(s => s.spotId === spotId);
    if (!spot) return;

    const tickets = [...this._tickets.value];
    const ticketIndex = tickets.findIndex(t => t.floorId === floorId && t.spotId === spotId);
    if (ticketIndex === -1) return;

    const ticket = { ...tickets[ticketIndex], unparkedAt: new Date().toLocaleString() };

    const closed = [...this._closedTickets.value, ticket];
    const updatedTickets = tickets.filter(t => t.ticketId !== ticket.ticketId);
    spot.occupied = false;

    // Emit updated states
    this._tickets.next(updatedTickets);
    this._closedTickets.next(closed);
    this._floors.next(floors);
  }

  // ----------------------------
  // Ticket Helpers
  // ----------------------------
  addTicket(ticket: ParkingTicket) {
    const updated = [...this._tickets.value, ticket];
    this._tickets.next(updated);
  }

  removeTicket(ticketId: string) {
    const updated = this._tickets.value.filter(t => t.ticketId !== ticketId);
    this._tickets.next(updated);
  }

  getTicketBySpot(floorId: string, spotId: string): ParkingTicket | undefined {
    return this._tickets.value.find(t => t.floorId === floorId && t.spotId === spotId);
  }

  private getAllowedType(floorId: string, spotId: string): string {
    const floor = this.floors.find(f => f.floorId === floorId);
    const spot = floor?.spots.find(s => s.spotId === spotId);
    return spot?.allowedType || 'UNKNOWN';
  }

  private generateTicketId(): string {
    return 'T-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
}
