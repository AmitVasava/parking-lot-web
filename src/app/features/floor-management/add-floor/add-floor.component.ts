import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingStateService } from 'src/app/core/services/parking-state.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-floor',
  templateUrl: './add-floor.component.html'
})
export class AddFloorComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private state: ParkingStateService, private notify: NotificationService) {
    this.form = this.fb.group({
      floorId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const floorId = this.form.value.floorId.trim();
      if (!floorId) return;

      this.state.addFloor(floorId);
      this.notify.show('Floor added successfully!', 'success');
      this.form.reset();
    }
  }
}
