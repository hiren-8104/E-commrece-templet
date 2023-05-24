import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';

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
  constructor(public commonsercice: CommonService, public route: Router, private storage: StorageService) { }
  cateToggle: boolean = false


  ngOnInit(): void {
    this.getFavoriteItemslength()
    let favItem: any = this.storage.getStorageItem("favorite")
    if (favItem) {
      this.favItemCount = JSON.parse(favItem).length
      console.log(this.favItemCount)

    }
    // subscribe a list of manu
    this.cartItemCount = this.storage.getStorageItem("cartItem")
    this.commonsercice.getCategory().subscribe({
      next: (res) => { this.headerSection.category = res }
    })

  }


  // manu click to navigate and its active

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
  
  // subscribe to get favorite items  length
  getFavoriteItemslength() {
    this.commonsercice.favouritesProductsService.subscribe({
      next: (res) => {
        this.favItemCount = res.length
      }
    })
  }

  // select a category

  selectedCate(item: any) {
    this.route.navigate(['Shop', item])
    this.dropDwonIsActive = false
  }
}
