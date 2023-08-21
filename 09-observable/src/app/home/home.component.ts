import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObserverSubscription: Subscription;
  constructor() {}

  ngOnInit() {
    // custom observable
    this.firstObserverSubscription = interval(1000).subscribe((count) => {
      console.log('%chome.component.ts count :', 'color: #007acc;', count);
    });
  }

  // observer must be destory after use
  ngOnDestroy(): void {
    this.firstObserverSubscription.unsubscribe();
  }
}
