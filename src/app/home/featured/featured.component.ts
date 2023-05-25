import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
featureSecData:any =[
  {
    icon:"check",
    name:"Quality Product"
  },
  {
    icon:"shipping-fast",
    name:"Free Shipping"
  },
  {
    icon:"exchange-alt",
    name:"14-Day Return"
  },
  {
    icon:"phone-volume",
    name:"24/7 Support"
  },
]

  constructor() { }

  ngOnInit(): void {
  }

}
