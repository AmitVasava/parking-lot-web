import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ParkingFloor } from 'src/app/core/models/floor.model';
import { ParkingStateService } from 'src/app/core/services/parking-state.service';

@Component({
  selector: 'app-floor-spot-grid',
  templateUrl: './floor-spot-grid.component.html'
})
export class FloorSpotGridComponent {
  @Input() floors$!: Observable<ParkingFloor[]>;
  @Input() readOnly = false;
  @Input() showTickets = false;

  @Output() park = new EventEmitter<{ floorId: string; spotId: string; allowedType: string }>();
  @Output() unpark = new EventEmitter<{ floorId: string; spotId: string; vehicleNumber?: string }>();

  expandedSpot: string | null = null;

  constructor(public state: ParkingStateService) { }

  toggleDetails(spotId: string) {
    this.expandedSpot = this.expandedSpot === spotId ? null : spotId;
  }

  handlePark(floorId: string, spotId: string, allowedType: string) {
    this.park.emit({ floorId, spotId, allowedType });
  }

  handleUnpark(floorId: string, spotId: string, vehicleNumber?: string) {
    this.unpark.emit({ floorId, spotId, vehicleNumber });
  }
}
