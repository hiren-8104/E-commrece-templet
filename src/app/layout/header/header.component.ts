import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemCount: any = 0
  favItemCount: any 
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
        navName: "My Orders",
        route: "/orders"
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
    private toastrService: ToastrService,
    private auth: AuthService
  ) { }
  cateToggle: boolean = false


  ngOnInit(): void {
    this.getFavoriteProductCount()
    this.getCartProductCount()


    this.commonsercice.totalCartProductService.subscribe({
      next: (res: any) => {
        this.cartItemCount = (res) ? res : 0
      }
    });
    this.commonsercice.totalfavoriteProductService.subscribe({
      next: (res: any) => {
        this.favItemCount = (res) ? res : 0
      }
    });
    // subscribe a list of manu

    let list = { isCategoryList: true }
    this.commonsercice.getProduct(list).subscribe({
      next: (res: any) => {

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
  getFavoriteProductCount() {
    this.commonsercice.getfavoriteProduct().subscribe({
      next: (res: any) => {
        this.commonsercice.totalCartProductService.next(res.data?.products.length)
        console.log(res.data?.products.length, "favorite rohit       rrrrrrrrrrrr");

        this.favItemCount = res.data?.products.length
      }
    })
  }

  // subscribe to get favorite items  length
  getCartProductCount() {
    this.commonsercice.getCartItem().subscribe({
      next: (res: any) => {

        // console.log(res, "+++++++++++++++");
        this.cartItemCount = res.data?.products.length
      }
    })
  }

  // select a category

  selectedCate(item: any) {
    this.route.navigate(['Shop', item])
    this.dropDwonIsActive = false
  }
  goTo(path: any) {
    this.commonsercice.commonFunctions(path)
  }


  getCurrentUSer() {

  }
}
