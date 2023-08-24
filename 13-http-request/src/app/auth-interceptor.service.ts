import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('%creq', 'color: #007acc;', req);

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'X'),
    });

    return next.handle(modifiedRequest);
  }
}
