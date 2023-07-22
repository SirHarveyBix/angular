import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // change encapsulation policy for the component's style like : _ngcontent-ng-c962867798
  encapsulation: ViewEncapsulation.None,
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input('srvElement') element: {
    type: string;
    name: string;
    content: string;
  };
  @Input() name: string;

  @ViewChild('heading', { static: true }) header: ElementRef;

  // ContentChild because contentParagraph is not part of the view (app.component)
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

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
    console.log(
      '   (ngOnInit)=> header (Text Content) :\n',
      this.header.nativeElement.textContent
    );
    console.log(
      '   (ngOnInit)=> Text Content of paragraph (#contentParagraph)',
      this.paragraph.nativeElement.textContent
    );
  }

  ngDoCheck() {
    console.log('ngDoCheck() Called !');
    // Called during every change detection run
  }
  ngAfterContentInit() {
    console.log('ngAfterContentInit() Called !');
    // Called after content (ng-content) has been projected into view
    console.log(
      '   (ngAfterContentInit)=> Text Content of paragraph (#contentParagraph)',
      this.paragraph.nativeElement.textContent
    );
  }
  ngAfterContentChecked() {
    console.log('ngAfterContentChecked() Called !');
    // Called every time the projected content has been checked
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit() Called !');
    // Called after the component’s view (and child views) has been initialized
    console.log(
      '   (ngAfterViewInit)=> header (Text Content) :\n',
      this.header.nativeElement.textContent
    );
  }
  ngAfterViewChecked() {
    console.log('ngAfterViewChecked() Called !');
    // Called every time the view (and child views) have been checked
  }
  ngOnDestroy() {
    console.log('ngOnDestroy() Called !');
    //  Called once the component is about to be destroyed
  }
}
