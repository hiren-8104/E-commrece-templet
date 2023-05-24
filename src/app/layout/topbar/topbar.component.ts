import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    country: ["US", "RU", "IND"],
    coustomerCare: {
      title: "Customer Service",
      number: "+012 345 6789"
    }
  }
  selectedCurrncy: any = "USD";
  constructor(public common: CommonService, private route: Router, private storage: StorageService) { }

  ngOnInit(): void {
    this.currencySelet()
    var storeCurrncy: any = this.storage.getStorageItem("defultCurrncy")
    if (storeCurrncy) {
      this.selectedCurrncy = JSON.parse(storeCurrncy)
    }
  }

  // selected the currency
  currencySelet(item?: any) {
    if (item) {
      this.selectedCurrncy = item
      this.storage.setStorageItem("defultCurrncy", item)
    }
    this.common.currncypipe.next(this.selectedCurrncy)
  }

  // for the search all product
  search() {
    if (this.searchForm.value.searchValue) {
      this.route.navigate(['/Shop'])
    }
    this.common.searchfilters.next(this.searchForm.value.searchValue)
  }

// logout
  logout(){
    this.common.allHidden.next(false)
    localStorage.clear()
    this.route.navigate(['/login'])
  }
}
