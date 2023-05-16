import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropDwonIsActive: boolean = false;
  headerSection: any = {
    category: [],
    navItem: [
      {
        navName: "Home",
        route: "/"
      },
      {
        navName: "Shop",
        route: "/Shop"
      },

      {
        navName: "Page",
        route: "/cart",
        isDropDwon: true,
        dropDwon: [
          {
            name: "Shoping Cart",
            route: "/cart"
          },
          {
            name: "Check Out",
            route: ""
          },
        ]
      },
      {
        navName: "Contact",
        route: "/contact"
      },

    ]

  }
  constructor(private commonsercice: CommonService, public route: Router) { }
  cateToggle: boolean = false
  ngOnInit(): void {

    this.commonsercice.getCategory().subscribe({
      next: (res) => { this.headerSection.category = res }
    })

  }
  manuClick(navItem: any) {

    if (navItem.isDropDwon) {

      this.dropDwonIsActive = !this.dropDwonIsActive
    }

    else {
      this.route.navigate([`/${navItem.route}`], { queryParams: { 'allProduct': 'product' } })
      this.dropDwonIsActive = false
    }

  }
  selectedCate(item: any) {
    console.log(item, ":_____________________")
    this.route.navigate(['/Shop'], { queryParams: { 'selCate': item } })
    this.dropDwonIsActive = false
  }
}
