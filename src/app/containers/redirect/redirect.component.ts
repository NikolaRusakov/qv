import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import {  State } from '@app/reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'qv-redirect',
  templateUrl: './redirect.component.html',
})
export class RedirectComponent implements OnInit {
  // token$ = this.store.pipe(select($selectAuthToken)).pipe(
  //   map(token => token)
  // );

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>, // private readonly init: InitService,
  ) {
    console.log(this.route.snapshot.paramMap.get('token'));
    const token = this.route.snapshot.paramMap.get('token');
    // this.init.channel.port1.onmessage = onMessage;
    window.postMessage(
      { token },
      location.origin /*, [this.init.channel.port2]*/,
    );
    // window.close();
    /* function onMessage(e) {
       console.log('close redirect window');
       console.log(e);
       return e;*/
  }
  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    console.log(window);
    console.log(parent);
    setTimeout(() => {
      window.postMessage({ token }, location.origin);
    }, 2000);

    // window.postMessage(
    //   { token },
    //   location.origin /*, [this.init.channel.port2]*/,
    // );
    console.log(location.origin);
  }
  forwardMessage(): void {
    const token = this.route.snapshot.paramMap.get('token');

    window.postMessage(
      { token },
      location.origin /*, [this.init.channel.port2]*/,
    );
  }
}
