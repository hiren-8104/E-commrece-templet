import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  userSubscribeForm:FormGroup=this.fb.group({
    userEmail:["", [Validators.email, Validators.required]]
  })

footerData:any={
  address:[
    {
      icon :"map-marker-alt text",
      details:"123 Street, New York, USA"
    },
    {
      icon :"envelope",
      details:"info@example.com"
    },
    {
      icon :"phone-alt",
      details:"+012 345 67890"
    },
  ],
  linkLists:[
    {
      name :"Home",
      route:""
    },
    {
      name :"Our Shop",
      route:""
    },
    {
      name :"Shop Detail",
      route:""
    },
    {
      name :"Shopping Cart",
      route:""
    },
    {
      name :"Checkout",
      route:""
    },
    {
      name :"Contact Us",
      route:""
    },
  ],
  socialMedia:['twitter','facebook','linkedin-in','instagram']
}
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  signUp(){
    if(this.userSubscribeForm.valid){
      confirm("Subscribe ")
    }
    {
      alert("Enter valid email")
    }
  }
}
