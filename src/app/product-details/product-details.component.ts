import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId!: any
  quntity: number = 1
  tabActive: any = "Description"
  config: any = {
    autoplay: true,
    loop: true,
    spaceBetween: 10,
  };
  // reviewDetails: any = {
  //   productId: "",
  //   rating: 0,
  //   review: ""
  // }
  product: any = {
    productSize: ["S", "m", "l", "XL", "XXL"],
    productColor: ["red", "green", "blue", "pink", "white"],
    tabs: [
      {
        name: "Description",
        isActive: true
      },
      {
        name: "Information",
        isActive: false
      },
      {
        name: "Reviews",
        isActive: false
      }],

  }
  selectedProduct: any = []

  reviewForm: FormGroup = this.fb.group({
    productId: ["", Validators.required],
    review: ['', Validators.required],
    rating: [0, Validators.required]

  })

  constructor(private activatedRoute: ActivatedRoute, public commonService: CommonService, private fb: FormBuilder, private toastr: ToastrService) { }


  ngOnInit(): void {

    // for breadcrumbs
    this.commonService.breadcrumbs.next([
      { label: "Home", route: "/" },
      { label: "Shop", route: "/Shop" },
      { label: "details", route: "" }
    ])


    // for perticular product get
    this.activatedRoute.queryParams.subscribe((params: any) => {

      this.productId = params.ProductId
      this.commonService.getSelectedProduct(this.productId).subscribe({
        next: (res) => {
          console.log(res.data.product);
          this.reviewForm.controls['productId'].setValue(res.data.product._id)
          this.selectedProduct = res.data.product

        },
        error: (err) => { console.log(err) }
      })

    })
  }

  // review Form 
  ReViewformSubmit() {
    if (this.reviewForm.valid) {
      // console.log(this.reviewForm.value);
      
      this.commonService.addProductReview(this.reviewForm.value).subscribe({

        next: (res) => {
          if(res.status==200) {
            this.reviewForm.reset()
            this.toastr.success(res.message)
            this.ngOnInit()
          }
        }
      })
    }
    else {
      this.toastr.error("form is not valid")
    }
  }

  // for a tab change 
  tabChange(name: any) {
    this.tabActive = name
  }


  quntityUpDwon(opration: string) {
    if (opration === "+") {
      this.quntity++
    }
    else if (this.quntity > 1) {

      this.quntity--
    }
  }


  addToCart() {
    let body = {
      productId: this.productId,
      quantity: this.quntity
    }
    this.commonService.addIntoCart(body).subscribe({
      next: (res) => {
        this.commonService.totalCartProductService.next(res.productsInCart)
        this.toastr.success(res.message)
      },
      error: (err) => { console.log(err) }
    })
  }
  giveRate(val: any) {
  
    this.reviewForm.controls['rating'].setValue(val)
  }


}
