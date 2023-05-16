import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.scss']
})
export class ShopingCartComponent implements OnInit {
  cartProduct: any = []
  hiren: number = 1

  constructor(private common: CommonService) { }

  ngOnInit(): void {


    this.common.getCartItem(3).subscribe({
      next: (res) => {
        console.log(res, "this is a cart item")
        // res.products.forEach((product: any) => {
        //   console.log(product)
        //   this.common.getProduct(product.productId).subscribe({
        //     next: (res) => {
        //       console.log(res, "dfhjkhgkjdh")
        //       this.cartProduct.push(res)
        //     },
        //     error: (err) => { console.log(err) }
        //   })
        // })

      },

      error: (err) => { console.log(err) }
    })
  }

  fn(val: any) {
    this.hiren++
    console.log(this.cartProduct)

  }

}
