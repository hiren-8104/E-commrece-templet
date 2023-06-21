import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopingCartComponent implements OnInit {
  abc: any;
  cartProduct: any = {
    cartItem: [],
    cartCheck: {
      subTotal: 0,
      shipping: 10,

    }
  }
  body: any = {

    productId: '',
    quantity: 0
  }



  constructor(
    public common: CommonService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {


    // breadcrumbs
    this.common.breadcrumbs.next(
      [
        { label: "Home", route: "/" },
        { label: "Shop", route: "/Shop" },
        { label: "Shoping Cart", route: "cart" }
      ])

    this.getcart()
  }

  getcart() {
    this.common.getCartItem().subscribe({
      next: (resp) => {
        this.cartProduct.cartItem = resp.data.products
        this.finalSum()
        this.cdr.markForCheck()
      },
      error: (err) => { console.log(err) }
    })
  }


  // increment drecrement quantity
  // quantityPlusMinus(opration: string, index: number, id: string) {

  //   this.cartProduct.cartItem[index].quantity = (opration === '+') ? (this.cartProduct.cartItem[index].quantity + 1) : (this.cartProduct.cartItem[index].quantity - 1);
  //   if (this.cartProduct.cartItem[index].quantity >= 1) {
  //     this.body = {

  //       productId: id,
  //       quantity: this.cartProduct.cartItem[index].quantity
  //     }
  //     this.addToCart()

  //   }
  //   else {
  //     this.cartProduct.cartItem[index].quantity = 1

  //   }
  // }
  quantityChange(opration: string, item: any) {
    (opration == '+') ? (item.quantity++) : (item.quantity--)
    this.body = {
      productId: item.product.productId,
      quantity: item.quantity
    }
    this.addToCart();
    this.cdr.markForCheck();

  }



  // remove product
  removeItem(index: number, id: any) {
    this.common.removeCartItem(id.cartId).subscribe({
      next: (res) => {
        this.cartProduct.cartItem.splice(index, 1)
        this.common.totalCartProductService.next(this.cartProduct.cartItem.length)
        this.finalSum()
        this.cdr.markForCheck()
      },
      error: (err) => {
        console.log(err);
      }
    })


  }

  addToCart() {
    this.common.addIntoCart(this.body).subscribe({
      next: (res) => {
        this.finalSum()
        this.cdr.markForCheck()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  // final sum of all product
  finalSum() {
    let count = 1

    if (this.cartProduct.cartItem.length == 0) {
      this.cartProduct.cartCheck.shipping = 0
    }
    let sum = 0

    this.cartProduct.cartItem.forEach((ele: any) => {
      sum += ele.quantity * ele.product.price
    })
    this.cartProduct.cartCheck.subTotal = sum
  }

  // goto checkout page
  goToCheckOut() {
    if (this.cartProduct.cartItem.length != 0) {
      console.log(this.cartProduct);

      this.common.checkoutData.next(this.cartProduct)
      this.router.navigate(['/checkout'])
    }
  }

  directQuntityChange(event: any, item: any ) {
    
    console.log(event);

    if (event) {
      this.body = {
        productId: item.product.productId,
        quantity: <Number>event
      }
      this.addToCart()
    }
    
  }

}
