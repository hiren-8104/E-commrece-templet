import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { currencyRate } from 'src/app/shared/interface/currncy';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
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
  constructor(public common: CommonService, private route: Router, private storage: StorageService) { }

  ngOnInit(): void {
    if (this.readCookie('googtrans')) {
      this.selectedLanguage = this.readCookie('googtrans').split('/')[this.readCookie('googtrans').split('/').length - 1]
    }
    var storeCurrncy: any = this.storage.getStorageItem("defultCurrncy")
    if (storeCurrncy) {
      this.selectedCurrncy = JSON.parse(storeCurrncy)
      this.common.currncypipe.next(this.selectedCurrncy)
    }
  }

  // selected the currency
  currencySelet(item?: any) {
    if (item) {
      // this.common.getCurrncyrate(item).subscribe({
      //   next: (res) => {
           
          // console.log(res.data[`${item}`], "this is currency rate")
          this.selectedCurrncy = item
          this.storage.setStorageItem("defultCurrncy", item)
          let currncyObj:currencyRate={
            name:item,
            rate:1

          }
          this.common.currncypipe.next(currncyObj)
        }
    //   })
    // }
  }

  // for the search all product
  search() {
    if (this.searchForm.value.searchValue) {
      this.route.navigate(['/Shop'])
    }
    this.common.searchfilters.next(this.searchForm.value.searchValue)
  }

  // change the language
  changeLanguage(item: any) {
    this.selectedLanguage = item
    document.cookie = 'googtrans=' + `/en/${item}`;
    location.reload()
  }

  // logout
  logout() {
    this.common.allHidden.next(false)
    localStorage.removeItem("token")
    this.route.navigate(['/login'])
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
}
