import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isChecked: boolean = false
  checkOutData!: any

  billingAdress: FormGroup = this.fb.group({
    firstName: ["hiren", Validators.required],
    lastName: ["dabhi", Validators.required],
    email: ["hirendabhi8104@gamil.com", [Validators.required, Validators.email]],
    mobileNo: ["7600924242", Validators.required],
    address: ["jam gadhka", Validators.required],
    secondAddress: ["jam gadhka", Validators.required],
    country: ['India', Validators.required],
    city: ['Dwarka', Validators.required],
    state: ['Gujrat', Validators.required],
    zipCode: ['361320', Validators.required],
    moreDetails: this.fb.array([], Validators.required)

  })
  formArray!: FormArray;

  constructor(private common: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.common.breadcrumbs.next([{ label: "Home", route: "/" }, { label: "Shop", route: "/Shop" }, { label: "CheckOut", route: "checkout" }])


    this.formArray = this.billingAdress.get('moreDetails') as FormArray;



    this.common.checkoutData.subscribe({
      next: (res) => {
        this.checkOutData = res
      },
      error: (err) => { console.log(err) }
    })
  }

  addMoreDetails() {
    this.isChecked = !this.isChecked

    let shippingAddres: FormGroup = this.fb.group({
      firstName: ["Hiren", Validators.required],
      lastName: ["dabhi", Validators.required],
      email: ["hirendabhi8104@gamil.com", [Validators.required, Validators.email]],
      mobileNo: ["7600924242", Validators.required],
      address: ["jam gadhka", Validators.required],
      secondAddress: ["jam gadhka", Validators.required],
      country: ['India', Validators.required],
      city: ['Dwarka', Validators.required],
      state: ['Gujrat', Validators.required],
      zipCode: ['361320', Validators.required],
    })
    if (this.formArray.length < 1) {
      this.formArray.push(shippingAddres)
    }



  }
  placeOrder() {
    let a = confirm("you can place your order");
    (a) ? alert("your order has been successfully placed") : alert("your order not placed")
  }
  
}
