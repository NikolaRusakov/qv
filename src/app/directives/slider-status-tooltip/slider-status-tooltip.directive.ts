import {
  AfterViewChecked,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

interface StepperDefinition {
  min: number;
  max: number;
  step: number;
}

@Directive({
  selector: '[qvSliderStatusTooltip]',
})
export class SliderStatusTooltipDirective
  implements OnChanges, OnInit, AfterViewChecked {
  @Input() qvSliderStatusTooltip;

  private stepperDef: StepperDefinition;

  /* get vertical(): boolean { return this._vertical; }
   set vertical(value: boolean) {
     this._vertical = coerceBooleanProperty(value);
   }
   get _thumbContainerStyles(): { [key: string]: string } {
     let axis = this.vertical ? 'Y' : 'X';
     // For a horizontal slider in RTL languages we push the thumb container off the left edge
     // instead of the right edge to avoid causing a horizontal scrollbar to appear.
     let invertOffset =
       (this._getDirection() == 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
     let offset = (invertOffset ? this.percent : 1 - this.percent) * 100;
     return {
       'transform': `translate${axis}(-${offset}%)`
     };
   }
   get percent(): number { return this._clamp(this._percent); }
 */
  private _clamp(value: number, min = 0, max = 1) {
    return Math.max(min, Math.min(value, max));
  }

  constructor(private _elRef: ElementRef, private renderer: Renderer2) {
    //
  }

  ngAfterViewChecked() {}

  ngOnInit() {
    const { max, value } = this.qvSliderStatusTooltip;
    const position = -((value / max) * -100 + 100);
    const matContainer = this._elRef.nativeElement
      .getElementsByClassName('mat-slider-wrapper')
      .item(0);
    const thumbContainer = this._elRef.nativeElement
      .getElementsByClassName('mat-slider-thumb-container')
      .item(0)
      .cloneNode(false);
    const thumbLabel = this._elRef.nativeElement
      .getElementsByClassName('mat-slider-thumb-label')
      .item(0)
      .cloneNode(true);

    this.renderer.addClass(thumbContainer, 'thumb-container');
    this.renderer.setStyle(
      thumbContainer,
      'transform',
      `translateX(${position}%)`,
    );

    this.renderer.addClass(thumbLabel, 'thumb-label');
    this.renderer.setStyle(thumbLabel, 'border-radius', '0 50% 50% 50%');
    this.renderer.setStyle(thumbLabel, 'transform', 'rotate(45deg)');
    this.renderer.setStyle(
      thumbLabel,
      'background-color',
      'rgba(255,255,255,.3)',
    );
    this.renderer.setStyle(thumbLabel, 'top', '16px');

    const thumbLabelText = thumbLabel
      .getElementsByClassName('mat-slider-thumb-label-text')
      .item(0);
    this.renderer.setStyle(thumbLabelText, 'opacity', '1');
    thumbLabelText.innerHTML = value;

    this.renderer.appendChild(thumbContainer, thumbLabel);
    this.renderer.appendChild(matContainer, thumbContainer);
  }

  ngOnChanges(changes: SimpleChanges) {
    /*const {min, max, step} = this.qvSliderStatusTooltip;
    this.stepperDef = {min, max, step};
    console.log(this.stepperDef);
    console.log(this.stepperDef);*/
    /*    const matContainer = this._elRef.nativeElement.getElementsByClassName('mat-slider-ticks-container');
        const thumbLabel = this._elRef.nativeElement.getElementsByClassName('mat-slider-thumb-label').cloneNode(true);
        ['mat-slider-horizontal ', 'mat-slider-thumb-label'].map(className => this.renderer.removeClass(thumbLabel, className));
        // => this.renderer.appendChild(thumbLabel, className)
        // this.renderer.appendChild()
        // .mat-slider-horizontal .mat-slider-thumb-label

        console.log(thumbLabel);
        console.log(this._elRef.nativeElement);*/
    console.log(changes);
  }
}
