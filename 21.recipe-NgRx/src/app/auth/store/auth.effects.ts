import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionType, login, loginFail } from './auth.action';
import { switchMap, map, of, tap, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

@Injectable()
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private router: Router
  ) {}

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
              const expirationDate = new Date(
                new Date().getTime() + Number(resData.expiresIn) * 1000
              );
              return login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate,
              });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorRes.error || !errorRes.error.error) {
                return of(loginFail({ error: errorMessage }));
              }
              switch (errorRes.error.error.message) {
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
              return of(loginFail({ error: errorMessage }));
            })
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActionType.LOGIN),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
