import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

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
    const customIntervalObservable =
      // new Observable<number>( observer => {
      Observable.create((observer: Observer<number>) => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 2) observer.complete();
          //if (count > 3) observer.error(new Error('Count is greater 3!'));
          count++;
        }, 1000);
      });

    this.firstObserverSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => data > 0),
        map((data: number) => 'Round : ' + (data + 1))
      )
      .subscribe(
        (count: number) =>
          console.log('%chome.component.ts count :', 'color: #007acc;', count),
        (error: Error) =>
          console.warn('%chome.component.ts error :', 'color: #cc0000;', error),
        () => console.log('Completed !')
      );

    /**
     * same as :

     * this.firstObserverSubscription = interval(1000).subscribe((count) => {
     *    console.log('%chome.component.ts count :', 'color: #007acc;', count);
     *   });
     */
  }

  // observer must be destory after use
  ngOnDestroy(): void {
    this.firstObserverSubscription.unsubscribe();
  }
}
