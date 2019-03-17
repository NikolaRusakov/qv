import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedirectComponent } from './redirect.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RedirectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RedirectComponent,
      },
    ]),
  ],
  exports: [RedirectComponent],
})
export class RedirectModule {}
