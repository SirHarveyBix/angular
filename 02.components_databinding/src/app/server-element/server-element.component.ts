import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // change encapsulation policy for the component's style like : _ngcontent-ng-c962867798
  encapsulation: ViewEncapsulation.None,
})
export class ServerElementComponent implements OnInit, OnChanges {
  @Input('srvElement') element: {
    type: string;
    name: string;
    content: string;
  };
  @Input() name: string;

  constructor() {
    console.log('constructor() Called !');
  }
  /** Lifecycle Hooks --> */
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges() Called !');
    console.log('changes :', changes); // element and name log com from ou @Input()
    // Called after a bound input property changes
  }
  ngOnInit() {
    console.log('ngOnInit() Called !');
    // Called once the component is initialized
  }

  ngDoCheck() {
    // Called during every change detection run
  }
  ngAfterContentInit() {
    // Called after content (ng-content) has been projected into view
  }
  ngAfterContentChecked() {
    // Called every time the projected content has been checked
  }
  ngAfterViewInit() {
    // Called after the component’s view (and child views) has been initialized
  }
  ngAfterViewChecked() {
    // Called every time the view (and child views) have been checked
  }
  ngOnDestroy() {
    //  Called once the component is about to be destroyed
  }
}
