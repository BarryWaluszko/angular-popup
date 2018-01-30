import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnDestroy, OnInit {

  // listenFunc will hold the function returned by "renderer.listen"
  listenFunc: Function;

  // @HostListener('window:keydown', ['$event'])
  // onKeyDown(event: KeyboardEvent) {
  //   console.log(event);
  //   if (event.keyCode == 27) //on a keyboard ESC key was pressed
  //     this.closeMe();
  // }

  @Input()
  public counter: number = 0;

  @Input()
  public x: number = 0;

  @Input()
  public y: number = 0;

  @Output()
  public counter2: EventEmitter<number> = new EventEmitter();

  constructor(private _viewContainerRef: ViewContainerRef, private renderer: Renderer2, private el: ElementRef) {
    // We cache the function "listen" returns
    //target can be: 'window'|'document'|'body'
    this.listenFunc = this.renderer.listen('body', 'keydown', (event: KeyboardEvent) => {
      if (event.keyCode == 27) {//on a keyboard ESC was pressed
        event.stopPropagation();
        this.closeMe();
      }
    });
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.renderer.setStyle(this.el.nativeElement.firstChild, 'top', this.y + 'px');
    this.renderer.setStyle(this.el.nativeElement.firstChild, 'left', this.x + 'px');
  }

  ngOnDestroy() {
    //this will not be automatically executed when 'removeChild()' method is fired. 'removeChild()' is inside 'closeMe()' method. 
    //So 'ngOnDestroy' must be executed maually!
    this.listenFunc();
  }

  closeMe() {
    this._viewContainerRef.
      element.nativeElement.
      parentElement.
      removeChild(this._viewContainerRef.element.nativeElement);
    this.ngOnDestroy();
  }

  decrement() {
    this.counter2.emit(--this.counter);
  }

  increment() {
    this.counter2.emit(++this.counter);
  }
}