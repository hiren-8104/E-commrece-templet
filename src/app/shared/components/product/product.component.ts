import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  favouriteProducts: any[] = []
  rpp: number = 6
  p: number = 1
  recentsViewProduct: any[] = []
  totalProduct !: any
  @Input() recentsProductData: any = null
  @Input() FeatureProduct!: any[];
  @Input() productDetailsData: any = null
  @Input() favData!: any
  @Input() allProductData: any = false
  @Output() getPage: any = new EventEmitter<number>();
  productData: any[] = []
  paginationConfig: any = {
    itemsPerPage: this.rpp, currentPage: this.p
  }
  constructor(public commonService: CommonService,
    private route: Router,
    private cdr: ChangeDetectorRef,
    private storage: StorageService
  ) { }

  ngOnInit(): void {


    let a = this.storage.getStorageItem('recentsViewProduct')
    if (a) {
      this.recentsViewProduct = JSON.parse(a)
    }

  }

  ngOnChanges(): void {
    if (this.allProductData) {
      this.productData = this.allProductData
    }
    else if (this.favData) {
      this.productData = this.favData
    }
    else if (this.recentsProductData) {
      this.productData = this.recentsProductData
    }
    else if (this.FeatureProduct) {
      this.productData = this.FeatureProduct
    }
    else if (this.productDetailsData) {
      this.commonService.getProduct().subscribe({
        next: (res) => {
          this.productData = res.data.products;
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

  // for view in details
  seletedPro(item: any) {
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
    console.log(item, "item _Id")
    this.route.navigate(['/details'], { queryParams: { 'ProductId': item._id } })
  }

  // for a favourite product
  makeFavourite(item: any) {
    let localStore: any = this.storage.getStorageItem("favorite")

    if (localStore) {
      this.favouriteProducts = JSON.parse(localStore)
    }
    else {
      this.favouriteProducts.push(item)
      localStorage.setItem('favorite', JSON.stringify(this.favouriteProducts))
      this.commonService.favouritesProductsService.next(this.favouriteProducts)
      return
    }
    let isFavouriteProduct;
    isFavouriteProduct = this.favouriteProducts.some((ele) => {
      return ele.id == item.id;
    })

    if (isFavouriteProduct != true) {
      this.addfavouriteProduct(item)
    }
    else {
      this.removefavouriteProduct(item)
    }
  }

  // add favourite products
  addfavouriteProduct(item: any) {

    this.favouriteProducts.push(item)
    this.commonService.favouritesProductsService.next(this.favouriteProducts)
    localStorage.setItem('favorite', JSON.stringify(this.favouriteProducts))
  }

  // remove favourite products
  removefavouriteProduct(item: any) {
    this.favouriteProducts.map((res: any, index: any) => {
      if (res.id == item.id) {
        this.favouriteProducts.splice(index, 1);
      }
    })
    this.commonService.favouritesProductsService.next(this.favouriteProducts)
    localStorage.setItem('favorite', JSON.stringify(this.favouriteProducts))
  }

  pageChange(val: any) {
    console.log(val)
    // this..paginationConfigcurrentPage = val;
    this.getPage.emit(val)
    this.cdr.markForCheck()

  }

  addToCart(id: string) {
    let item = {
      _product: id,
      quantity: <Number>1
    }
    console.log(item)

    this.commonService.addIntoCart(item).subscribe({
      next: (res) => {
        console.log(res, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      },
      error:(err)=>{console.log(err)}
    })
  }
}
