import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  quntityUpDwon: number = 1
  tabActive: any = "Information"
  config: any = {
    autoplay: true,
    loop: true,
    spaceBetween: 10,
  };
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
    userReview: [
      {

        userName: "John Smith",
        date: new Date(),
        massage: "Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsumet no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum."
      }
    ]
  }
  selectedProduct: any = []

  reviewForm: FormGroup = this.fb.group({
    massage: ['', Validators.required],
    userName: ['', Validators.required],
    date: [new Date(), Validators.required],
    userEmail: ['', Validators.email]
  })

  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, private fb: FormBuilder) { }


  ngOnInit(): void {

    // for breadcrumbs
    this.commonService.breadcrumbs.next([
      { label: "Home", route: "/" },
      { label: "Shop", route: "/Shop" },
      { label: "details", route: "" }
    ])


    // for perticular product get
    this.activatedRoute.queryParams.subscribe((params: any) => {
      
     
      this.commonService.getSelectedProduct(params.ProductId).subscribe({
        next: (res) => {
         
         this.selectedProduct=res.data.products[0]
          
        },
        error: (err) => { console.log(err) }
      })

    })
  }

// review Form 
  formSubmit() {
    if (this.reviewForm.valid) {
      this.product.userReview.push(this.reviewForm.value)
    }
    else {
      alert("form is not valid")
    }
  }

// for a tab change 
  tabChange(name: any) {
    this.tabActive = name
  }




}
