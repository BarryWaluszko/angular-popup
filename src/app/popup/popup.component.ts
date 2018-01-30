import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewContainerRef, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnDestroy, OnInit {

  // listenFunc will hold the function returned by "renderer.listen"
  private _listenFunc = [];
  private _draggableElem;
  private isMouseDown: Boolean = false;

  //@HostListener('mousedown', ['$event'])
  onMouseDown(event) {
    if (event.srcElement.id == "header") {
      this.isMouseDown = event.buttons === 1;
    } else
      this.isMouseDown = false;
  }

  //@HostListener('mouseup', ['$event'])
  onMouseUp(event) {
    this.isMouseDown = false;
  }

  //@HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isMouseDown ) {
      this.renderer.setStyle(this._draggableElem, 'top', (event.pageY - 15) + 'px');
      this.renderer.setStyle(this._draggableElem, 'left', (event.pageX - 150) + 'px');
    } else
      this.isMouseDown = false;
  }

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
    this._listenFunc.push(this.renderer.listen('body', 'keydown', (event: KeyboardEvent) => {
      if (event.keyCode == 27) {//on a keyboard ESC was pressed
        event.stopPropagation();
        this.closeMe();
      }
    }));
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._draggableElem = this.el.nativeElement.firstChild;
    this.renderer.setStyle(this._draggableElem, 'top', this.y + 'px');
    this.renderer.setStyle(this._draggableElem, 'left', this.x + 'px');
  }

  ngOnDestroy() {
    //this will NOT be automatically executed when 'removeChild()' method is fired. 'removeChild()' is inside 'closeMe()' method. 
    //So 'ngOnDestroy' must be executed maually!
    this._listenFunc.forEach(fn => { //remove all listeners
      fn();
    });
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