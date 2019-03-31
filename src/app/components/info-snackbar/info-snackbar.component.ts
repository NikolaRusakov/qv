import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'qv-info-snackbar',
  templateUrl: './info-snackbar.component.html',
})
export class InfoSnackbarComponent implements OnInit {
  message = this.data.message;
  action = this.data.action;
  caller = this.data.caller;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit() {}
}
