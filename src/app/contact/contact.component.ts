import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/services/common.service';

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
    massage: ["", [Validators.required]]
  });
  constructor(private fb: FormBuilder ,private common:CommonService) { }

  ngOnInit(): void {
this.common.breadcrumbs.next([{label:"Home", route:"/"},{label:"Contact", route:"/Contact"}])


  }
  contactFormSubmit(){
    if(this.contactForm.valid){
      alert("your form has been submitted")
    }
    else{
      alert("Error! Please try again")

    }
  }
}
