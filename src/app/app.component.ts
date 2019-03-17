import { Component  } from '@angular/core';
import { InitService } from '@app/services/init.service';

@Component({
  selector: 'qv-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private service: InitService) {}
}
