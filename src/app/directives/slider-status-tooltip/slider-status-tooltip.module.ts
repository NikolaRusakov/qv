import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderStatusTooltipDirective } from '@app/directives/slider-status-tooltip/slider-status-tooltip.directive';

@NgModule({
  declarations: [SliderStatusTooltipDirective],
  imports: [CommonModule],
  exports: [SliderStatusTooltipDirective],
})
export class SliderStatusTooltipModule {}
