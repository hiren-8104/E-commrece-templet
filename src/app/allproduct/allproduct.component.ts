import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.scss'],

})
export class AllproductComponent implements OnInit {
  
  p = 1
  sortToggle: boolean = false
  productList: any = []

  allProductSectionData: any = {

    priceFilter: {
      filterName: 'Filter by price',
      filter: [],
    },
    colorFilter: {
      filterName: "Filter by color",
      filter: ["All Color", "red", "green", "blue", "pink", "white"]
    },
    sizeFilter: {
      filterName: "Filter by size",
      filter: ["All size", "S", "m", "l", "XL", "XXL"]
    },
    sort: {
      name: "Sorting",
      sortBy: ["Ascending", "Descending"]
    }
  }

  constructor(private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private route: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // breadcrumbs
    this.commonService.breadcrumbs.next([{ label: "Home", route: "/" }, { label: "Shop", route: "/Shop" }])
    // get category form params
    this.activatedRoute.params.subscribe((params: any) => {
      if (params['category']) {
        this.getSelectedCategoryProduct(params['category'])
      }
      else {
        this.getAllProduct()
      }
    })
    this.cdr.detectChanges()
  }

// get all product 
  getAllProduct() {
    this.commonService.getProduct().subscribe({
      next: (res) => {
        this.productList = res
      },
      error: (error) => { console.log(error) }
    })
  }

// get category wise product
  getSelectedCategoryProduct(category: string) {
    this.commonService.getSpeicalCategory(category).subscribe({
      next: (res) => {
        this.productList = res
      },
      error: (err) => { console.log(err) }
    })
  }

  // sort btn toggle
  sort() {
    this.sortToggle = !this.sortToggle
  }

  // sorting product
  sortProduct(item: any) {
    if (item == "Ascending") {
      let sort = { sort: "asc" }
      this.commonService.getSort(sort).subscribe({
        next: (res) => { this.productList = res, this.cdr.detectChanges(); }
      })
    }
    else {
      let sort = { sort: "desc" }
      this.commonService.getSort(sort).subscribe({
        next: (res) => { this.productList = res, this.cdr.detectChanges(); }
      })
    }
    this.sortToggle = false
  }




}