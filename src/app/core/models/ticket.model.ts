export interface ParkingTicket {
  ticketId: string;
  floorId: string;
  spotId: string;
  vehicleNumber: string;
  allowedType: string;
  parkedAt: string;
  unparkedAt?: string; // optional for active tickets
}
