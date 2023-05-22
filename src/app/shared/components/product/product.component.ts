import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  p = 1
  recents: any[] = []
  @Input() callingHome: boolean = false;
  @Input() homeData: any = null
  @Input() favData!: any
  @Input() allProductData: any = false
  productData: any[] = []
  constructor(private commonService: CommonService, private route: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    let a = localStorage.getItem('recents')
    if (a) {
      this.recents = JSON.parse(a)
    }

  }

  ngOnChanges(): void {
    if (this.allProductData) {


      this.productData = this.allProductData
    }
    else if (this.favData) {

      this.productData = this.favData
    }
    else if (this.callingHome) {
      let limit = 8
      this.commonService.getProduct(limit).subscribe({
        next: (res) => {
          this.productData = res;

          this.cdr.markForCheck()
        }

      })

    }
    this.cdr.markForCheck()
  }
  ngAfterViewInit(): void {
    this.productData.forEach((product) => {
      product['isFavourite'] = false
    })
  }
  seletedPro(item: any) {
    this.recents.unshift(item)
    localStorage.setItem('recents', JSON.stringify(this.recents))
    this.route.navigate(['/details'], { queryParams: { 'ProductId': item.id } })
  }


  fav(i: any) {
    if (this.productData[i]['isFavourite']) {
      this.productData[i]['isFavourite'] = false
    }
    else {

      this.productData[i]['isFavourite'] = true
    }

    this.commonService.favouritesProducts.next(this.productData)



  }
}
