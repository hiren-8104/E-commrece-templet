import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isChecked: boolean = false

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
    moreDetails: this.fb.group({})

  })
  constructor(private common: CommonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.common.breadcrumbs.next([{ label: "Home", route: "/" }, { label: "Shop", route: "/Shop" }, { label: "CheckOut", route: "checkout" }])
  }

  addMoreDetails() {
    this.isChecked = !this.isChecked
    let shippingAddres = this.fb.group({
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
    })

  

  }

}
