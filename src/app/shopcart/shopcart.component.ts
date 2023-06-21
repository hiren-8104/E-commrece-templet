import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/services/common.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-shopcart',
  templateUrl: './shopcart.component.html',
  styleUrls: ['./shopcart.component.scss'],

})
export class ShopCartComponent implements OnInit {
  isCheckedPrice!: any
  isCheckedColor!: any
  isCheckedSize!: any

  filterDataForBody: any = {
    pagination: {}
  }

  sortToggle: boolean = false
  paginationToggle: boolean = false
  productList: any = []
  paginationObject = { itemsPerPage: 6, currentPage: 1, totalItems: 20 }
  allProductSectionData: any = {
    sortByPrice: [],
    sortByColor: [],
    sortBySize: [],

    sort: {
      name: "Sorting",
      sortBy: [{
        order: "Price Low-High",
        value: { name: "price", val: "asc" }
      },
      {
        order: "Price  High-Low",
        value: { name: "price", val: "desc" }
      },
      {
        order: "Rating Low-High",
        value: { name: "rating", val: "asc" }
      },
      {
        order: "Rating  High-Low",
        value: { name: "rating", val: "desc" }
      },

      ],
      pagePerRecord: ["4", "6", "8", "10", "15", "20"]
    }
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    public commonService: CommonService,
    private route: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // get filter list
    this.allfilterList()
    // breadcrumbs
    this.commonService.breadcrumbs.next([{ label: "Home", route: "/" }, { label: "Shop", route: "/Shop" }])
    // get category form params
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['category']) {
        this.filterDataForBody.filter = {}
        // console.log(params['category'], "+++++++++++++++++++++", this.filterDataForBody)
        this.filterDataForBody['filter']['category'] = params['category'];
        this.getAllProduct()
      }
      else {
        this.getAllProduct()
      }
    });
    this.cdr.detectChanges()
    // get search value product
    this.getSearchProduct()
  }

  // get all product 
  getAllProduct() {
    this.filterDataForBody['pagination'].page = <Number>this.paginationObject.currentPage
    this.filterDataForBody.pagination['productsPerPage'] = <Number>this.paginationObject.itemsPerPage;
    this.commonService.getProduct(this.filterDataForBody).subscribe({
      next: (res) => {
        this.productList = res.data.products
        this.paginationObject.totalItems = res.totalProducts
        this.commonService.paginationsService.next(this.paginationObject)
        this.isCheckedPrice = ""
        this.cdr.detectChanges()
      },
      error: (error) => { console.log(error) }
    })
  }

  // sort btn toggle
  sort() {
    this.sortToggle = !this.sortToggle
  }
  paginnationSortToggle() {

    this.paginationToggle = !this.paginationToggle

  }
  // change per page products
  pagePerProducts(value: any) {
    this.paginationObject.itemsPerPage = value;
    this.paginationObject.currentPage= 1
    this.paginationToggle = false
    this.getAllProduct()
  }

  // sorting product
  sortProduct(item: any) {

    this.filterDataForBody.sort = {
      field: item.name,
      order: item.val
    }
    console.log(this.filterDataForBody)
    this.commonService.getProduct(this.filterDataForBody).subscribe({
      next: (res) => {
        this.productList = res.data.products
        this.cdr.markForCheck();
      }

    })


    this.sortToggle = false

  }

  changePage(val: any) {
    this.paginationObject.currentPage = val;
    // if(this.paginationObject.totalItems/val <  0){
    //   this.paginationObject.currentPage = 1
    // }

    this.getAllProduct()
  }


  // get filter list
  allfilterList() {
    this.commonService.getFilterList().subscribe({
      next: (res) => {

        this.allProductSectionData.sortByColor = res.data.colors
        this.allProductSectionData.sortByPrice = res.data.priceRanges
        this.allProductSectionData.sortBySize = res.data.sizes
      }
    })
  }

  commonFilterFn(field: string, event: any, item: any) {
    // let item = {...val}

    // if (item.totalProducts) {
    //   delete item.totalProducts
    // }
    if (!("filter" in this.filterDataForBody)) {
      this.filterDataForBody['filter'] = {}
    }

    if (!(`${field}` in this.filterDataForBody.filter)) {
      this.filterDataForBody.filter[`${field}`] = []
    }
    if (event.target.checked) {
      this.filterDataForBody.filter[`${field}`].push(item)
    }
    else {
      let i = this.filterDataForBody.filter[`${field}`].indexOf(item)
      this.filterDataForBody.filter[`${field}`].splice(i, 1)
    }
    if (this.filterDataForBody.filter[`${field}`].length == 0) {
      delete this.filterDataForBody.filter[`${field}`]
    }
    if (Object.keys(this.filterDataForBody.filter).length === 0) {
      delete this.filterDataForBody.filter
    }
    this.getAllProduct()
    this.cdr.markForCheck()
  }


  getSearchProduct() {
    this.commonService.searchfilters.subscribe({
      next: (res) => {
        if (res.length > 0) {

          if (!("filter" in this.filterDataForBody)) {
            this.filterDataForBody['filter'] = {}
            if (!("search" in this.filterDataForBody.filter)) {
              this.filterDataForBody.filter['search'] = {}

            }
          }

          this.filterDataForBody.filter.search = res
          this.getAllProduct()
          this.cdr.markForCheck()
          // console.log(this.filterDataForBody)
        }
      },
      error: (err) => { console.log(err) }
    })
  }

  // Removing   Filter
  removingFilter(field: any,) {
    console.log("Removing Filter")
    this.isCheckedPrice = false
    delete this.filterDataForBody.filter[field]
    this.getAllProduct()
  }
}