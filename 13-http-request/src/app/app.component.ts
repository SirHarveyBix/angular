import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        'https://angular-http-request-b3287-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
        postData
      )
      .subscribe((responseData) => {
        console.log(
          '%capp.component.ts responseData',
          'color: #007acc;',
          responseData
        );
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPost() {
    this.http
      .get(
        'https://angular-http-request-b3287-default-rtdb.europe-west1.firebasedatabase.app/posts.json'
      )
      .subscribe((posts) => {
        console.log('%capp.component.ts posts', 'color: #007acc;', posts);
      });
  }
}
