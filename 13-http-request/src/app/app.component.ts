import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  errorMessage: string = null;
  private errorSub: Subscription;
  isFetching = false;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error //
      .subscribe((error) => (this.errorMessage = error));

    this.isFetching = true;
    this.postsService
      .fetchPosts() //
      .subscribe(
        (posts) => {
          this.isFetching = false;
          this.loadedPosts = posts;
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
  }

  onCreatePost(postData: Post) {
    this.postsService.creatAndStorePost(postData);
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService
      .fetchPosts() //
      .subscribe(
        (posts) => {
          this.isFetching = false;
          this.loadedPosts = posts;
        },
        (error) => {
          this.isFetching = false;
          this.errorMessage = error.message;
        }
      );
  }

  onClearPosts() {
    this.postsService
      .clearPosts() //
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

  onHandleError() {
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
