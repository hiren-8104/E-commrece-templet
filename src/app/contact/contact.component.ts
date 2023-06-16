import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    subject: ["", [Validators.required]],
    message: ["", [Validators.required]]
  });
  constructor(private fb: FormBuilder, private common: CommonService, private toaster: ToastrService
    ) { }

  ngOnInit(): void {
    // breadcrumbs
    this.common.breadcrumbs.next([
      { label: "Home", route: "/" },
      { label: "Contact", route: "/Contact" }
    ])
  }

  // contact form data
  contactFormSubmit() {
    console.log(this.contactForm.value)
    if (this.contactForm.valid) {
     this.common.contactUs(this.contactForm.value).subscribe({
      next:(res:any)=>{
        this.toaster.success(res.message)
      }
     })
    }
    else {
      alert("Error! Please try again")

    }
  }
}
