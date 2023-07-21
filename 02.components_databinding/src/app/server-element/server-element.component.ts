import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // change encapsulation policy for the component's style like : _ngcontent-ng-c962867798
  encapsulation: ViewEncapsulation.None,
})
export class ServerElementComponent {
  @Input('srvElement') element: {
    type: string;
    name: string;
    content: string;
  };
}
