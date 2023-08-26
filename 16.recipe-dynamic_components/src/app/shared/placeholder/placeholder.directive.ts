import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPalceholder]',
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
