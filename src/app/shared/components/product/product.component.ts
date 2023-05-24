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
  favouriteProducts: any[] = []
  rpp: number = 8
  p = 1
  recentsViewProduct: any[] = []
  @Input() recentsProductData: any = null
  @Input() callingHome: boolean = false;
  @Input() productDetailsData: any = null
  @Input() favData!: any
  @Input() allProductData: any = false
  productData: any[] = []
  constructor(public commonService: CommonService, private route: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    let a = localStorage.getItem('recentsViewProduct')
    if (a) {
      this.recentsViewProduct = JSON.parse(a)
    }

  }

  ngOnChanges(): void {
    if (this.allProductData) {
      this.rpp = 6
      this.productData = this.allProductData
    }
    else if (this.favData) {
      this.productData = this.favData
    }
    else if (this.recentsProductData) {
      this.productData = this.recentsProductData
    }
    else if (this.callingHome || this.productDetailsData) {
      this.rpp = 8
      this.commonService.getProduct(this.rpp).subscribe({
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
    console.log(item, "recentProducts", this.recentsViewProduct)
    let isDuplicate;
    if (this.recentsViewProduct) {
      isDuplicate = this.recentsViewProduct.some((ele): boolean => {
        return ele.id == item.id
      })
    }
    if (!isDuplicate) {

      this.recentsViewProduct.unshift(item)
    }
    localStorage.setItem('recentsViewProduct', JSON.stringify(this.recentsViewProduct))
    this.route.navigate(['/details'], { queryParams: { 'ProductId': item.id } })
  }


  makeFavourite(item: any) {
    let localStore: any = localStorage.getItem("favorite")
    if (localStore) {
      this.favouriteProducts = JSON.parse(localStore)
    }
  
    let isFavouriteProduct;
    isFavouriteProduct = this.favouriteProducts.some((ele) => {
      return ele.id == item.id;
    })


    if (!isFavouriteProduct) {
      this.addfavouriteProduct(item)
    }
    else {
      this.removefavouriteProduct(item)

    }


  }



  addfavouriteProduct(item: any) {
    console.log("Favourite added successfully ", item.id)
    this.favouriteProducts.unshift(item)
    this.commonService.favouritesProductsService.next(this.favouriteProducts.length)
    localStorage.setItem('favorite', JSON.stringify(this.favouriteProducts))
  }


  removefavouriteProduct(item: any) {

    this.favouriteProducts.map((res: any, index: any) => {
      if (res.id == item.id) {
        console.log("Favourite Splice", item.id)
        this.favouriteProducts.splice(this.favouriteProducts[index], 1);
      }
    })
    this.commonService.favouritesProductsService.next(this.favouriteProducts.length)
    localStorage.setItem('favorite', JSON.stringify(this.favouriteProducts))

  }
}
