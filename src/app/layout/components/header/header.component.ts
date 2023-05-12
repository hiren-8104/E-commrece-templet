import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropDwonIsActive:boolean = false;
 headerSection:any={
  category:[
    {
      name:"Dresses",
      route:""
    },
    {
      name:"Shirts",
      route:""
    },
    {
      name:"Shirts",
      route:""
    },
    {
      name:"Shirts",
      route:""
    },
    {
      name:"Shirts",
      route:""
    },
  ],
  navItem:[
    {
      navName:"Home",
      route:""
    },
    {
      navName:"Shop",
      route:""
    },
    {
      navName:"Shop Details",
      route:""
    },
    {
      navName:"Page",
      isDropDwon:true,
      dropDwon:[
        {
          name:"Shoping Cart",
          route:""
        },
        {
          name:"Check Out",
          route:""
        },
      ]
    },
    {
      navName:"Contact",
      route:""
    },
    
  ]
  
 }
  constructor() { }

  ngOnInit(): void {
  }
  dropDwopToggle(navItem:any){
    
    if(navItem.isDropDwon){

      this.dropDwonIsActive=!this.dropDwonIsActive
    }

  }
}
