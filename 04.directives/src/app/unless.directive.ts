import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]',
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContanerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContanerRef.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContanerRef: ViewContainerRef
  ) {}
}
