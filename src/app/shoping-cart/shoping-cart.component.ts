import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {
  cartProduct: any = {
    cartItem: [],
    cartCheck: {
      subTotal: 0,
      shipping: 10,

    }
  }


  constructor(private common: CommonService) { }

  ngOnInit(): void {


    this.common.getCartItem(3).subscribe({
      next: (resp) => {
        
        resp.products.forEach((product: any) => {
          this.common.getSelectedProduct(product.productId).subscribe({
            next: (res) => {
              res['quantity'] = product.quantity

              this.cartProduct.cartItem.push(res)
              this.finalSum()
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


}
