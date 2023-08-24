import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  creatAndStorePost({ title, content }: Post) {
    this.http
      .post<{ name: string }>(
        'https://angular-http-request-b3287-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        { title, content }
      )
      .subscribe(
        (responseData) => {
          console.log(
            '%capp.component.ts responseData',
            'color: #007acc;',
            responseData
          );
        },
        (error) => this.error.next(error.message)
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-request-b3287-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        {
          headers: new HttpHeaders({
            'Custom-Header': "don't write posts here",
          }),
          params: new HttpParams().set('print', 'nothing'),
        }
      )
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          catchError((errorResponse) => {
            return throwError(() => new Error(errorResponse));
          });
          return postArray;
        })
      );
  }

  clearPosts() {
    return this.http.delete(
      'https://angular-http-request-b3287-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
    );
  }
}
