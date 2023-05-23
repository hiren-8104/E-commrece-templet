import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

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
  constructor(public common: CommonService, private route: Router) { }

  ngOnInit(): void {
  }
  currencySelet(item: any) {
    this.selectedCurrncy = item
    this.common.currncypipe.next(item)
  }
  search() {
    if (this.searchForm.value.searchValue) {
      this.route.navigate(['/Shop'])
    }

    this.common.searchfilters.next(this.searchForm.value.searchValue)

  }
}
