import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dropDwonIsActive: boolean = false;
  headerSection: any = {
    category: [],
    navItem: [
      {
        navName: "Home",
        route: ""
      },
      {
        navName: "Shop",
        route: "product"
      },

      {
        navName: "Page",
        isDropDwon: true,
        dropDwon: [
          {
            name: "Shoping Cart",
            route: ""
          },
          {
            name: "Check Out",
            route: ""
          },
        ]
      },
      {
        navName: "Contact",
        route: "/contact"
      },

    ]

  }
  constructor(private commonsercice: CommonService, private route: Router) { }
cateToggle:boolean=false
  ngOnInit(): void {

    this.commonsercice.getCategory().subscribe({
      next: (res) => { this.headerSection.category = res }
    })

  }
  manuClick(navItem: any) {

    if (navItem.isDropDwon) {

      this.dropDwonIsActive = !this.dropDwonIsActive
    }

    else {
      this.route.navigate([`/${navItem.route}`], {queryParams:{'allProduct':'product'}})
    }

  }
  selectedCate(item:any){
    console.log(item , ":_____________________")
    this.route.navigate(['/product'],{queryParams:{'selCate':item}}
    )
  }
}
