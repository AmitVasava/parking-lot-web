import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingStateService } from 'src/app/core/services/parking-state.service';
import { map } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-spot',
  templateUrl: './add-spot.component.html'
})
export class AddSpotComponent {
  form: FormGroup;
  vehicleTypes = ['CAR', 'BIKE', 'TRUCK'];

  floors$ = this.state.floors$.pipe(map(floors => floors.map(f => f.floorId)));
  hasFloors$ = this.state.floors$.pipe(map(floors => floors.length > 0));

  constructor(private fb: FormBuilder, private state: ParkingStateService, private notify: NotificationService) {
    this.form = this.fb.group({
      floorId: ['', Validators.required],
      spotId: ['', Validators.required],
      allowedType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { floorId, spotId, allowedType } = this.form.value;
      this.state.addSpot(floorId, {
        spotId,
        allowedType,
        occupied: false
      });
      this.notify.show('Spot added successfully.', 'success');
      this.form.reset();
    }
  }
}
