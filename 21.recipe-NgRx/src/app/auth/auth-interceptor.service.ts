import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1), // take subscribe and unsbcribe to the subject
      map((authState) => authState.user),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token),
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}
