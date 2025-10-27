import { Invoice } from './invoice.model';

export interface ParkingTicket {
  ticketId: string;
  floorId: string;
  spotId: string;
  vehicleNumber: string;
  allowedType: string;
  parkedAt: string;
  unparkedAt?: string;
  fee?: number;
}
