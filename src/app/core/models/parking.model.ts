export interface SpotDto {
  spotId: string;
  allowedType: string;
  occupied: boolean;

  ticketId?: string | null;
  vehicleNumber?: string | null;
  entryTime?: string | null; // ISO string
}

export interface FloorDto {
  floorId: string;
  spots: SpotDto[];
}

// Park / Unpark Requests
export interface ParkRequestDto {
  licensePlate: string;
  vehicleType: string;
}

export interface ParkResponseDto {
  ticketId: string;
  floorId: string;
  spotId: string;
  entryTime: Date;
}

export interface UnparkRequestDto {
  ticketId: string;
  spotId: string;
}

export interface UnparkResponseDto {
  ticketId: string;
  status: string;
}
