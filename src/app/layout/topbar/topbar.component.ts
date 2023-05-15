import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
topBarSection:any={
  navItem:[
    {
      name:"About",
      route:""
    },
    {
      name:"Contact",
      route:""
    },
 
    {
      name:"Help",
      route:""
    },
    {
      name:"FAQs",
      route:""
    },
  ],
  currency:["EUR","GBP","USD","CAD" , "INR"],
  country:["US","RU","IND"],
  coustomerCare:{
    title:"Customer Service",
    number:"+012 345 6789"
  }
}
  constructor() { }

  ngOnInit(): void {
  }

}
