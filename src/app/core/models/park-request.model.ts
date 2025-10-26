export interface ParkRequest {
  licensePlate: string;
  vehicleType: string; // 'CAR', 'BIKE', 'TRUCK'
  entryTime: string;   // ISO string
}