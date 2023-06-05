import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopingCartComponent implements OnInit {
  cartProduct: any = {
    cartItem: [],
    cartCheck: {
      subTotal: 0,
      shipping: 10,

    }
  }


  constructor(
    public common: CommonService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {

   
    // breadcrumbs
    this.common.breadcrumbs.next(
      [
        { label: "Home", route: "/" },
        { label: "Shop", route: "/Shop" },
        { label: "Shoping Cart", route: "cart" }
      ])

    // cart item for a user id '5'
    this.common.getCartItem().subscribe({
      next: (resp) => {
        this.cartProduct.cartItem = resp.data.products
       console.log(this.cartProduct.cartItem , "MMMMMMMMMMMMMMMMMMMMMMMMMMMM")
       this.cdr.markForCheck()
      },
      error: (err) => { console.log(err) }
    })
  }


  // increment quantity
  increaseQuntity(i: any) {
    this.cartProduct.cartItem[i].quantity = 1 + parseInt(this.cartProduct.cartItem[i].quantity)
    this.finalSum()
  }

  // decrease quntity
  decreaseQuntity(i: any) {
    if (this.cartProduct.cartItem[i].quantity > 1) {
      this.cartProduct.cartItem[i].quantity = parseInt(this.cartProduct.cartItem[i].quantity) - 1
      this.finalSum()
    }
  }

  // remove product
  removeItem(i: any) {
    this.cartProduct.cartItem.splice(i, 1)
    localStorage.setItem("cartItem", this.cartProduct.cartItem.length)
    this.finalSum()
  }


  // final sum of all product
  finalSum() {
    if (this.cartProduct.cartItem.length == 0) {
      this.cartProduct.cartCheck.shipping = 0
    }
    this.cartProduct.cartCheck.subTotal = 0
    this.cartProduct.cartItem.forEach((ele: any) => {
      let sum = 0
      sum += ele.quantity * ele.price
      this.cartProduct.cartCheck.subTotal += sum
    });
  }

  // goto checkout page
  goToCheckOut() {
    this.common.checkoutData.next(this.cartProduct)
    this.router.navigate(['/checkout'])
  }

}
