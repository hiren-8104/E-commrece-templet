import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ConditionalExpr } from '@angular/compiler';

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
    private storage: StorageService,
    private auth: AuthService,
    private toastr: ToastrService
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
      console.log("#######", this.favData)
      this.productData = this.favData

      this.cdr.markForCheck()
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
  makeFavourite(item: any, i: number) {
    console.log(item, "item")
    if (this.favData) {
      this.commonService.removefavoriteProduct(item._id).subscribe({
        next: (res) => {
          console.log("success00000", item._id);

          this.commonService.totalfavoriteProductService.next(this.favData.length)
          this.productData.splice(i, 1)
          this.cdr.markForCheck()
        },
        error: (err) => { console.log(err) }
      })
    }
    else {
      this.commonService.addfavoritesProduct(item._id).subscribe({
        next: (res: any) => {
          console.log("add api in count of fav")
          this.toastr.warning("", "Please Login")

        },

      })
    }

  }



  pageChange(val: any) {
    console.log(val)
    // this..paginationConfigcurrentPage = val;
    this.getPage.emit(val)
    this.cdr.markForCheck()

  }

  addToCart(id: string) {

    if (this.auth.deCodeToken()) {
      let item = {

        productId: id,
        quantity: <Number>1
      }


      this.commonService.addIntoCart(item).subscribe({
        next: (res) => {
          console.log("add", res)
          this.toastr.success(res.message)
        },
        error: (err) => { console.log(err) }
      })
    }
    else {
      this.toastr.warning("", "Please Login")
    }
  }
}
