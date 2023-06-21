import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featureProductList!: any[]
  offerData!:any
  constructor(private common: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    // this.common.breadcrumbs.next([])

    
    this.getFeatureProduct()
    if(!this.offerData){

      this.common.offerDataService.subscribe({
          next:(res)=>{
              this.offerData=res
            }
          })
        }
  }


  getFeatureProduct() {
    let body = { filter: { isFeatured: true } }
    this.common.getProduct(body).subscribe({
      next: (res) => {
        // console.log(res.data)
        this.featureProductList = res.data.products

      }
    })
  }
}
