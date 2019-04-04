import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { interval } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'qv-info-snackbar',
  templateUrl: './info-snackbar.component.html',
})
export class InfoSnackbarComponent implements OnInit {
  message = this.data.message;
  action = this.data.action;
  caller: () => void = this.data.caller;
  duration: number = this.data.duration as number;

  readonly FRAME_DURATION = Math.floor(1000 / 60);
  readonly FRAME_COUNT = Math.floor(this.duration / this.FRAME_DURATION);
  curCount = interval(this.FRAME_DURATION).pipe(
    take(this.FRAME_COUNT),
    //   100 - (v * 100) / (this.duration / 20) - 100 / (this.duration / 20),
    // )),
    tap(console.log),
    map(value => 100 - (value / this.FRAME_COUNT) * 100),
    tap(console.log),
  );

  @HostBinding('@.disabled')
  public animationsDisabled = this.data.animationsDisabled;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit() {}
}
