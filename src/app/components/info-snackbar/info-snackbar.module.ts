import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSnackbarComponent } from './info-snackbar.component';
import {
  MatButtonModule,
  MatProgressBarModule,
  MatSnackBarModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [InfoSnackbarComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatProgressBarModule,
    FlexLayoutModule,
  ],
  exports: [InfoSnackbarComponent],
})
export class InfoSnackbarModule {}
