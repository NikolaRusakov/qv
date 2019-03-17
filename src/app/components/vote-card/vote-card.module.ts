import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSliderModule,
  MatSlideToggleModule,
} from '@angular/material';
import { MatDividerModule } from '@angular/material/divider';
import { VoteCardComponent } from './vote-card.component';
import 'hammerjs';
import { SliderStatusTooltipModule } from '@app/directives/slider-status-tooltip/slider-status-tooltip.module';

@NgModule({
  declarations: [VoteCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSliderModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    SliderStatusTooltipModule,
  ],
  exports: [VoteCardComponent],
})
export class VoteCardModule {}
