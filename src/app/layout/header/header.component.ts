import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemCount: any = 0
  favItemCount: any = 0
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
        navName: "Contact",
        route: "/contact"
      },

    ]

  }
  constructor(public commonsercice: CommonService, public route: Router) { }
  cateToggle: boolean = false
  ngOnInit(): void {
    let favItem= localStorage.getItem("favorite")
        if(favItem){
          this.favItemCount = JSON.parse(favItem).length
        }
    this.commonsercice.favouritesProductsService.subscribe({
      next: (res) => {
        this.favItemCount =res
      }
    })

    this.cartItemCount = localStorage.getItem("cartItem")


    this.commonsercice.getCategory().subscribe({
      next: (res) => { this.headerSection.category = res }
    })

  }
  manuClick(navItem: any) {

    if (this.headerSection.navItem[2].navName == 'Page') {
      this.headerSection.navItem[2].route = (this.route.url.split('?')[0] == '/checkout') ? '/checkout' : '/cart'
    }
    if (navItem.isDropDwon) {

      this.dropDwonIsActive = !this.dropDwonIsActive
    }

    else {
      this.route.navigate([`/${navItem.route}`])
      this.dropDwonIsActive = false
    }


  }
  selectedCate(item: any) {
    this.route.navigate(['Shop', item])
    this.dropDwonIsActive = false
  }
}
