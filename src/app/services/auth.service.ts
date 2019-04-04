import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginModel } from '@app/models/user-login.model';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LoginToMattermostFailed } from '@app/features/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly api: HttpClient) {}

  loginMattermost(login: UserLoginModel) {
    return this.api
      .post(`${environment.mattermost.url}/api/v4/users/login`, login)
      .pipe(
        map(user => user),
        tap(console.info),
        catchError(error =>
          of(new LoginToMattermostFailed(error.statusText, error.status_code)),
        ),
      );
  }
}
