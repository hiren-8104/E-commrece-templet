import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  productData: any[] = []
  constructor( private commonService: CommonService) { }

  ngOnInit(): void {
     let limit=8
    this.commonService.getProduct(limit).subscribe({
      next: (res) => {
        console.log(res)
        this.productData= res
      }
    })






  }
}
