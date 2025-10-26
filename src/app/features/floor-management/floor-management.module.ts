import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FloorListComponent } from './floor-list/floor-list.component';
import { AddFloorComponent } from './add-floor/add-floor.component';
import { AddSpotComponent } from './add-spot/add-spot.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  { path: '', component: FloorListComponent }
];

@NgModule({
  declarations: [
    FloorListComponent,
    AddFloorComponent,
    AddSpotComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    SharedModule 
  ]
})
export class FloorManagementModule { }
