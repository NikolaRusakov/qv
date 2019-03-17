import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAuthToken, State } from '@app/reducers';
import { map } from 'rxjs/operators';
import { InitService } from '@app/services/init.service';

@Component({
  selector: 'qv-redirect',
  templateUrl: './redirect.component.html',
})
export class RedirectComponent {
  token$ = this.store.pipe(select(selectAuthToken)).pipe(map(token => token));

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private readonly init: InitService,
  ) {
    console.log(this.route.snapshot.paramMap.get('token'));
    const token = this.route.snapshot.paramMap.get('token');
    this.init.channel.port1.onmessage = onMessage;

    window.postMessage({ token }, location.origin, [this.init.channel.port2]);

    function onMessage(e) {
      console.log('close redirect window');
      console.log(e);
      return e;
    }

    console.log(parent);
  }
}
