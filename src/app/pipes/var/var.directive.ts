import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface LetContext<T> {
  $implicit: T; // current item exposed as implicit value
  appLet: T;
}

@Directive({
  selector: '[qvVar]',
})
export class VarDirective<T> {
  constructor(
    private readonly viewRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<LetContext<T>>,
  ) {}

  @Input()
  set qvVar(value: T) {
    this.viewRef.createEmbeddedView(this.templateRef, {
      $implicit: value,
      appLet: value,
    });
  }
}
