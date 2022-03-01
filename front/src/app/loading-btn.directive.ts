import {Directive, ElementRef, Input, OnChanges, OnInit, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxLoading]'
})
export class LoadingBtnDirective implements OnInit, OnChanges {

  @Input('textLoading') loadingText: string;
  @Input('textInitial') initialText: string;
  @Input('loadingFlag') condition: boolean | undefined = undefined

  constructor(private elem: ElementRef) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    if (changes.condition && changes.condition.currentValue) {
      this.condition = changes.condition.currentValue
    }
    this.elem.nativeElement.innerText = (this.condition) ? this.loadingText : this.initialText;
    if (this.condition !== undefined) {
      this.elem.nativeElement.disabled = this.condition
    }

  }

}
