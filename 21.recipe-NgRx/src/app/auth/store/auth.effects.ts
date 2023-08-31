import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  authenticateFail,
  authenticateSuccess,
  autoLogin,
  loginStart,
  logout,
  signupStart,
} from './auth.action';
import { switchMap, map, of, tap, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
}

const handleAuthentication = ({
  expiresIn,
  email,
  localId,
  idToken,
}: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + Number(expiresIn) * 1000
  );
  const user = new User(email, localId, idToken, expirationDate);

  localStorage.setItem('userData', JSON.stringify(user));
  return authenticateSuccess({
    email,
    userId: localId,
    token: idToken,
    expirationDate,
    redirect: true,
  });
};

const handleError = (error: HttpErrorResponse) => {
  let errorMessage = 'An unknown error occurred!';
  if (!error.error || !error.error.error) {
    return of(authenticateFail({ error: errorMessage }));
  }
  switch (error.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(authenticateFail({ error: errorMessage }));
};

@Injectable()
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      switchMap(({ email, password }) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
            { email, password, returnSecureToken: true }
          )
          .pipe(
            map((resData) => {
              return handleAuthentication(resData);
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap(({ email, password }) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
            {
              email,
              password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              return handleAuthentication(resData);
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticateSuccess),
        tap((action) => action.redirect && this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return { type: 'DUMMY' };
        }
        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);
          return authenticateSuccess({
            email: loadedUser.email,
            userId: loadedUser.id,
            token: loadedUser.token,
            expirationDate: new Date(userData._tokenExpirationDate),
            redirect: false,
          });
        }
        return { type: 'DUMMY' };
      })
    )
  );
}
