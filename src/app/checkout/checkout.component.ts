import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  userAddressId: any = null;
  isOtherAddress: boolean = false
  userAddresses: any[] = [];
  checkOutData!: any
  formArray!: FormArray;
  isAddressBookSelected: any = ''
  isUpdateAddress: boolean = false
  orderDetails: any = {
    shipToDifferentAddress: this.isOtherAddress,
    billingId: "",
    deliveryId: "",
    totalAmount: 11110,
    shippingAmount: 111110,
    paymentMethod: "Cash on delivery"
  }


  billingAdress: FormGroup = this.fb.group({
    title: ["", Validators.required],
    name: ["", Validators.required],
    mobileNo: ["", Validators.required],
    addressLineOne: ["", Validators.required],
    addressLineTwo: ["", Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    landmark: ['', Validators.required],
    pincode: ['', Validators.required],

  })



  shippingAddres: FormGroup = this.fb.group({
    title: ["", Validators.required],
    name: ["Hiren", Validators.required],
    mobileNo: ["7600924242", Validators.required],
    addressLineOne: ["jam gadhka", Validators.required],
    addressLineTwo: ["jam gadhka", Validators.required],
    country: ['India', Validators.required],
    city: ['Dwarka', Validators.required],
    state: ['Gujrat', Validators.required],
    landmark: ['bhatiya road', Validators.required],

    pincode: ['361320', Validators.required],
  });

  constructor(public common: CommonService, private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {


    // breadcrumbs
    this.common.breadcrumbs.next([
      { label: "Home", route: "/" },
      { label: "Shop", route: "/Shop" },
      { label: "CheckOut", route: "checkout" }
    ])
    
    this.getAddresses()
    // cart product data
    this.common.checkoutData.subscribe({
      next: (res) => {
        if (!res) {
          this.router.navigate(['/cart'])
          return
        }
       
        this.checkOutData = res


      },
      error: (err) => { console.log(err) }
    })



  }

  // add other shipping address
  addMoreDetails() {
    this.isOtherAddress = !this.isOtherAddress
    this.orderDetails.shipToDifferentAddress = this.isOtherAddress


  }
  // get all shipping addresses
  getAddresses() {
    this.common.getUserAddress().subscribe({
      next: (res: any) => {
        console.log(res.data);

        this.userAddresses = res.data.addressBook

      }
    })
  }


  // ganrate Order 
  ganrateOrder() {
    if (this.userAddressId) {
      this.placeOrder()
    }

    else if (this.billingAdress.valid && this.isOtherAddress) {
      this.common.addUserAddress(this.billingAdress.value).subscribe({
        next: (res) => {
          this.orderDetails.billingId = res.addedAddressId
          this.common.addUserAddress(this.shippingAddres.value).subscribe({
            next: (resp) => {
              this.orderDetails.deliveryId = resp.addedAddressId
              this.placeOrder()
            },
            error: (err) => { console.log(err) }
          })
        },
        error: (err) => { console.log(err) }
      })

      this.orderDetails.billingId
      this.orderDetails.deliveryId

    }
    else if (this.billingAdress.valid) {
      this.common.addUserAddress(this.billingAdress.value).subscribe({
        next: (res) => {
          this.orderDetails.billingId = res.addedAddressId
          this.placeOrder()
        },
        error: (err) => { console.log(err) }
      })
    }
    else {
      this.toastr.error("some field are missing")
    }


  }
  addressChange(i: any, addressId?: any, perpose?: any) {
    if (perpose === "edit") {
      this.isUpdateAddress = true
      this.billingAdress.enable()
    }
    else {
      this.isUpdateAddress = false
      this.billingAdress.disable()
    }
    this.userAddressId = addressId;
    this.orderDetails.billingId = addressId
    this.billingAdress.patchValue(this.userAddresses[i])

  }

  removeAddress(i: any) {
    this.common.removingAddress(this.userAddresses[i].addressId).subscribe({
      next: (res) => {

        this.userAddresses.splice(i, 1)
      }
    })
  }
  updateAddress() {

    if (this.billingAdress.valid) {

      console.log(this.billingAdress.value)
      this.common.updateUserAddress(this.userAddressId, this.billingAdress.value).subscribe(
        {
          next: (res) => {
            console.log(res, this.userAddresses, this.billingAdress.value);
            this.isUpdateAddress = false
            this.billingAdress.reset()
          }

        })
    }

  }
  // addAddress(addressValue: any = this.billingAdress.value) {

  //   this.common.addUserAddress(addressValue).subscribe({
  //     next: (res) => {
  //       res.addedAddressId

  //     },
  //     error: (err) => { console.log(err) }
  //   })


  // }
  clearForm(callBy?: any) {
    if (callBy && callBy === 'shippingAddres') {
      this.userAddressId = null
      this.shippingAddres.enable()
      this.shippingAddres.reset()


    }
    else {

      this.userAddressId = null
      this.billingAdress.enable()
      this.billingAdress.reset()
      this.isOtherAddress = false
      this.isAddressBookSelected = false;
    }

  }


  placeOrder() {
    this.common.placeOrder(this.orderDetails).subscribe({
      next: (res: any) => {
        if (res.status == 200) {
          this.toastr.success(res.message)
          this.router.navigate(['/'])
          return
        }
      }
    })
  }
  shippingAddresChange(i: any, addressId?: any, perpose?: any) {
    if (perpose === "edit") {
      this.isUpdateAddress = true
      this.shippingAddres.enable()
    }
    else {
      this.isUpdateAddress = false
      this.shippingAddres.disable()
    }
    // this.userAddressId = addressId;
    this.orderDetails.deliveryId = addressId
    this.shippingAddres.patchValue(this.userAddresses[i])

  }
}
