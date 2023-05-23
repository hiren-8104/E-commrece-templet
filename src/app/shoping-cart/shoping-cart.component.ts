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


  constructor(public common: CommonService , private cdr: ChangeDetectorRef , private router: Router) { }

  ngOnInit(): void {
    this.common.breadcrumbs.next([{label:"Home", route:"/"},{label:"Shop", route:"/Shop"},{label:"Shoping Cart", route:"cart"}])


    this.common.getCartItem(5).subscribe({
      next: (resp) => {
        
        resp.products.forEach((product: any) => {
          this.common.getSelectedProduct(product.productId).subscribe({
            next: (res) => {
              res['quantity'] = product.quantity
              this.cartProduct.cartItem.push(res)
              this.finalSum()
              localStorage.setItem("cartItem",this.cartProduct.cartItem.length )
              this.cdr.markForCheck()
            },
            error: (err) => { console.log(err) }
          })
        })
      },
      error: (err) => { console.log(err) }
    })
  }

  increaseQuntity(i: any) {
    this.cartProduct.cartItem[i].quantity = 1 + parseInt(this.cartProduct.cartItem[i].quantity)
    this.finalSum()
  }
  decreaseQuntity(i: any) {
    if (this.cartProduct.cartItem[i].quantity > 1) {
      this.cartProduct.cartItem[i].quantity = parseInt(this.cartProduct.cartItem[i].quantity) - 1
      this.finalSum()
    }
  }
  removeItem(i: any) {
    this.cartProduct.cartItem.splice(i, 1)
    localStorage.setItem("cartItem",this.cartProduct.cartItem.length)
    this.finalSum()
  }


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
  goToCheckOut(){
    this.common.checkoutData.next(this.cartProduct)
    this.router.navigate(['/checkout'])
  }

}
