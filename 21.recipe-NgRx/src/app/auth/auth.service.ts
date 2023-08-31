import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { authenticateSuccess, logout } from './store/auth.action';

export interface AuthResponseData {
  kind: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private store: Store<AppState>) {}

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiration: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    if (userData._token) {
      this.store.dispatch(
        authenticateSuccess({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpiration),
        })
      );
      const expirationDate =
        new Date(userData._tokenExpiration) //
          .getTime() - new Date().getTime();

      this.autoLogout(expirationDate);
    }
  }

  logout() {
    this.store.dispatch(logout());
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
