import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';
import { MainDashboardComponent } from './main-dashboard.component';

@NgModule({
  declarations: [MainDashboardComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [MainDashboardComponent],
})
export class MainDashboardModule {}
