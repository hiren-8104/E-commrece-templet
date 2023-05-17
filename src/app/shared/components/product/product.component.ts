import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() parentData:any=null
  productData: any[] = []
  constructor( private commonService: CommonService ,private route: Router) { }

  ngOnInit(): void {
    
     let limit=8
    this.commonService.getProduct(limit).subscribe({
      next: (res) => {
         
        this.productData= res
      }
    })






  }
  seletedPro(item:any){
     
     this.route.navigate(['/details'],{queryParams:{'ProductId':item.id}})
    }
}
