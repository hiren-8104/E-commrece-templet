import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
