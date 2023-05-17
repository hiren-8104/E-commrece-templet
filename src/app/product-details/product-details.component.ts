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
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params.ProductId)
      this.commonService.getSelectedProduct(params.ProductId).subscribe({
        next: (res) => {
          console.log(res)
          this.selectedProduct = res
        },
        error: (err) => { console.log(err) }
      })

    })
  }



  formSubmit() {
    if (this.reviewForm.valid) {
      this.product.userReview.push(this.reviewForm.value)
    }
    else {
      alert("form is not valid")
    }

  }


  tabChange(name:any){
    console.log(name)
    this.tabActive = name

  }


}
