import { Component, ElementRef, HostListener, Renderer2, RendererFactory2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-commrece-Lauout';
  @ViewChild('btt') btt!: ElementRef
  constructor(private rendererr: Renderer2) { }
  backToTop(){
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll') fn() {
   
   
    if (window.scrollY > 100) {
      this.rendererr.addClass(this.btt.nativeElement, "d-block")
    } 
    
    else {
      this.rendererr.removeClass(this.btt.nativeElement, "d-block")
    }
  }
}
