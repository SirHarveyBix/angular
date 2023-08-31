import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ActionType,
  authenticateFail,
  authenticateSuccess,
} from './auth.action';
import { switchMap, map, of, tap, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
}

const handleAuthentification = ({
  expiresIn,
  email,
  localId,
  idToken,
}: AuthResponseData) => {
  const expirationDate = new Date(
    new Date().getTime() + Number(expiresIn) * 1000
  );
  return authenticateSuccess({
    email,
    userId: localId,
    token: idToken,
    expirationDate,
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
    private router: Router
  ) {}

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionType.SIGNUP_START),
      switchMap(({ email, password }) => {
        return this.http
          .post<AuthResponseData>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
            { email, password, returnSecureToken: true }
          )
          .pipe(
            map((resData) => {
              return handleAuthentification(resData);
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
      ofType(ActionType.LOGIN_START),
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
              return handleAuthentification(resData);
            }),
            catchError((errorRes) => {
              return handleError(errorRes);
            })
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.AUTHETICATE_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
