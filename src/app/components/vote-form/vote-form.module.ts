import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';
import { VoteFormComponent } from './vote-form.component';

@NgModule({
  declarations: [VoteFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule.withConfig({}),
  ],
  exports: [VoteFormComponent],
})
export class VoteFormModule {}
