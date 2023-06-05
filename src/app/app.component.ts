import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from './shared/services/storage.service';
import { CommonService } from './shared/services/common.service';
import { AuthService } from './shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allHidden: boolean = false;
  title = 'E-commrece-Lauout';
  @ViewChild('btt') btt!: ElementRef
  constructor(
    private rendererr: Renderer2,
    private storage: StorageService,
    private route:Router,
    public commonService:CommonService,
    private cdr: ChangeDetectorRef,
    private auth: AuthService,
    private toasterService : ToastrService
  ) { }



  ngOnInit(): void {
   if(!(this.validUser())){
      this.toasterService.warning("", "Please Login Again")
   }
  }
  
  backToTop() {
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

  validUser(){
    console.log("*************" ,this.auth.isValidToken())
    return this.auth.isValidToken()
  }
}
