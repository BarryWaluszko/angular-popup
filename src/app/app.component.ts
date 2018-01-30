import { Component, OnDestroy, ViewChild, ComponentRef, ViewContainerRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { PopupComponent } from './popup/popup.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  componentRef: ComponentRef<PopupComponent>;
  myNumber: number = 10;

  pageX: number = 0;
  pageY: number = 0;

  @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef; //create reference to the template: '<ng-template #parent></ng-template>'

  constructor(private _crf: ComponentFactoryResolver) {
    //'ComponentFactoryResolver' exposes 'resolveComponentFactory()' method that takes a component and returns a 'ComponentFactory'
    //You can think of 'ComponentFactory' as an object that knows how to create a component.
  }

  openPopup(event: MouseEvent) {
    this.container.clear();
    const factory: ComponentFactory<PopupComponent> = this._crf.resolveComponentFactory(PopupComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.counter = this.myNumber;
    this.componentRef.instance.x = event.pageX ;
    this.componentRef.instance.y = event.pageY ;

    this.componentRef.instance.counter2.subscribe(v => {
      this.myNumber = v;
    });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.componentRef)
      this.componentRef.destroy(); // don’t forget to destroy dynamically loaded component (modal window) them when parent component is destroyed:
  }
}
