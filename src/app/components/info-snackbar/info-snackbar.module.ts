import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoSnackbarComponent } from './info-snackbar.component';
import { MatButtonModule, MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [InfoSnackbarComponent],
  imports: [CommonModule, MatSnackBarModule, MatButtonModule],
  exports: [InfoSnackbarComponent],
})
export class InfoSnackbarModule {}
