import { ParkingSpot } from './spot.model';

export interface ParkingFloor {
  floorId: string;
  spots: ParkingSpot[];
}
