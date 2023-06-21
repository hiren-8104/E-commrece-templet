import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogInComponent } from 'src/app/auth/log-in/log-in.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  userDetails !: any
  searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl(null)
  })
  topBarSection: any = {
    navItem: [
      {
        name: "About",
        route: ""
      },
      {
        name: "Contact",
        route: ""
      },

      {
        name: "Help",
        route: ""
      },
      {
        name: "FAQs",
        route: ""
      },
    ],
    currency: ["EUR", "GBP", "USD", "CAD", "INR"],
    languages: ["en", "hi", "gu", "fr", "ru"],
    coustomerCare: {
      title: "Customer Service",
      number: "+012 345 6789"
    }
  }
  selectedLanguage: any = "en"
  selectedCurrncy: any = "USD";
  constructor(
    public common: CommonService,
    private route: Router,
    public storage: StorageService,
    private auth: AuthService,
    private toast: ToastrService,
    private cdr: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    if (this.readCookie('googtrans')) {
      this.selectedLanguage = this.readCookie('googtrans').split('/')[this.readCookie('googtrans').split('/').length - 1]
    }
    var storeCurrncy: any = this.storage.getStorageItem("defultCurrncy")
    if (storeCurrncy) {
      this.selectedCurrncy = storeCurrncy
      this.common.currncypipe.next(storeCurrncy)

    }
    this.common.tokenService.subscribe({
      next: (res: any) => {
        this.getusername()
        this.cdr.markForCheck()
      }
    })
  }

  // selected the currency
  currencySelet(item?: any) {

    if (item) {
      this.selectedCurrncy = item
      this.storage.setStorageItem("defultCurrncy", item)
      this.common.currncypipe.next(this.selectedCurrncy)

    }
  }

  // for the search all product
  search() {

    if (this.searchForm.value.searchValue && this.searchForm.valid) {
      this.common.searchfilters.next(this.searchForm.value.searchValue)
      this.route.navigate(['/Shop'])
    }
  }

  // change the language
  changeLanguage(item: any) {
    this.selectedLanguage = item
    document.cookie = 'googtrans=' + `/en/${item}`;
    location.reload()
  }

  // logout
  logout() {
    this.auth.logout().subscribe({
      next: (res) => {
        localStorage.removeItem("token")
        this.common.tokenService.next(null)
        this.route.navigate(['/'])
        this.toast.success(res.message);
      },
      error: (err) => { console.log(err) }
    })
    // this.route.navigate(['/auth/registration'])
  }

  // get cookies from the browser
  readCookie(name: any) {
    var c = document.cookie.split('; ');
    var cookies: any = {}, i, C;

    for (i = c.length - 1; i >= 0; i--) {
      C = c[i].split('=');
      cookies[C[0]] = C[1];
    }

    return cookies[name];
  }

  getusername() {
    this.userDetails = this.auth.deCodeToken()
  }

  goTo(path: string) {
    this.common.commonFunctions(path)
  }
}
