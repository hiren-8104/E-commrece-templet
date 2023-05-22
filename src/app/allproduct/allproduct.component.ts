import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.scss'],

})
export class AllproductComponent implements OnInit {
  recents: any[] = []
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



    let a = localStorage.getItem('recents')
    if (a) {
      this.recents = JSON.parse(a)

    }

    this.commonService.breadcrumbs.next([{ label: "Home", route: "/" }, { label: "Shop", route: "/Shop" }])
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


  getAllProduct() {
    this.commonService.getProduct().subscribe({
      next: (res) => {
        this.productList = res

      },
      error: (error) => { console.log(error) }
    })
  }

  getSelectedCategoryProduct(category: string) {
    this.commonService.getSpeicalCategory(category).subscribe({
      next: (res) => {

        this.productList = res

      },
      error: (err) => { console.log(err) }
    })
  }

  seletedPro(item: any) {

    // console.log(this.recents , "this.recents")
    this.recents.unshift(item)
    localStorage.setItem('recents', JSON.stringify(this.recents))
    this.route.navigate(['/details'], { queryParams: { 'ProductId': item.id } })
  }


  sort() {
    this.sortToggle = !this.sortToggle

  }

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


  fav(i: any) {
    // var localStore: any = localStorage.getItem("favorite")
    // if (localStore) {
    //   this.favPro = JSON.parse(localStore)
    // }
    // this.favPro.push(item);
    // if (JSON.parse(localStore)) {
    //   JSON.parse(localStore).map((res: any, index: any) => {
    //     if (res.id === item.id) {
    //       console.log("favorite", index)
    //       this.favPro.splice(this.favPro[index], 1);
    //     }
    //   })
    // }
    // localStorage.setItem('favorite', JSON.stringify(this.favPro))

    this.productList[i]['isFavourite'] = true
    this.commonService.favouritesProducts.next(this.productList)



  }

}