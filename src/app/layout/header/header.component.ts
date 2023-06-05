import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    public commonsercice: CommonService,
    public route: Router,
    private storage: StorageService,
    private toastrService: ToastrService
  ) { }
  cateToggle: boolean = false


  ngOnInit(): void {
    this.getFavoriteItemslength()
    let favItem: any = this.storage.getStorageItem("favorite")
    if (favItem) {
      this.favItemCount = JSON.parse(favItem).length


    }
    // subscribe a list of manu
    this.cartItemCount = this.storage.getStorageItem("cartItem")
    let list = { isCategoryList: true }
    this.commonsercice.getProduct(list).subscribe({
      next: (res: any) => {
        console.log(res)
        res.data.categories.forEach((ele: any) => {
          this.headerSection.category.push(ele.title)
        })

      }
    })

  }


  // manu click to navigate and its active

  manuClick(navItem: any) {

    this.route.navigate([`/${navItem.route}`])
    this.dropDwonIsActive = false

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
  goTo(path: any) {
    let token = this.storage.getStorageItem("token")
    if (token) {
      this.route.navigate([`${path}`])
    }
    else {
this.toastrService.warning( `Login and see your  ${path}`,"Please Login")
    }
  }
}
