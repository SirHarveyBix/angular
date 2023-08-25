import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  singUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgVLahxlweg1DTmqHDOBWZpR5e0L-oAr8',
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError((error) => {
          let errorMessage = 'An error occured.';

          switch (error.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }
  // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgVLahxlweg1DTmqHDOBWZpR5e0L-oAr8',
}
