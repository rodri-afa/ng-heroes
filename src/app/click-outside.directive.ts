import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {

  @Output() clickOut = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  public onClick(event:MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    event.stopPropagation();
    console.log('event:',event)
    console.log('elementRef:', this.elementRef)
    if (!clickedInside) {
      this.clickOut.emit();
    }
  }

}