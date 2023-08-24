import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  creatAndStorePost({ title, content }: Post) {
    this.http
      .post<{ name: string }>(
        'https://angular-http-request-b3287-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        { title, content }
      )
      .subscribe((responseData) => {
        console.log(
          '%capp.component.ts responseData',
          'color: #007acc;',
          responseData
        );
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://angular-http-request-b3287-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .pipe(
        map((responseData) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        })
      );
  }
}
