import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  config: any = {
    autoplay: true,
    loop: true,
    spaceBetween: 10,
  };
selectedProduct:any=[]
  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService ) { }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params.ProductId)
      this.commonService.getSelectedProduct(params.ProductId).subscribe({
        next: (res) => {
          console.log(res)
          this.selectedProduct=res
        },
        error: (err) => { console.log(err) }
      })

    })
  }


  



}
