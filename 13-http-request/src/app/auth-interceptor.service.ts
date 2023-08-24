import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('%cRequest is on its way \n', 'color: #00cc1b;', req.url);

    const modifiedRequest = req.clone({
      headers: req.headers.append('Auth', 'X'),
    });

    return next.handle(modifiedRequest); //
    // tap allow to manipulate le response
    // .pipe(
    //   tap((event) => {
    //      console.log('event :', event);
    //     if (event.type === HttpEventType.Response) {
    //       console.log(
    //         '%cResponse arrived, Body data :\n',
    //         'color: #cc0000;',
    //         event.body
    //       );
    //     }
    //   })
    // )
  }
}
