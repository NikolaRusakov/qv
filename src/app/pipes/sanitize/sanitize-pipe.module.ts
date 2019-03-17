import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SanitizePipe } from './sanitize.pipe';

@NgModule({
  declarations: [SanitizePipe],
  imports: [CommonModule],
  exports: [SanitizePipe],
})
export class SanitizePipeModule {}
