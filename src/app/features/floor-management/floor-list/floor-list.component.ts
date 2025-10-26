import { Component, OnInit } from '@angular/core';
import { ParkingStateService } from 'src/app/core/services/parking-state.service';

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html'
})
export class FloorListComponent implements OnInit {
  floors$ = this.state.floors$;

  constructor(private state: ParkingStateService) {}

  ngOnInit(): void {
  }
}
