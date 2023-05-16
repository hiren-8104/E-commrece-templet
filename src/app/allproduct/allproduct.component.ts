import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-allproduct',
  templateUrl: './allproduct.component.html',
  styleUrls: ['./allproduct.component.scss']
})
export class AllproductComponent implements OnInit {
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
    }
  }
  constructor(private activatedRoute: ActivatedRoute, private commonService: CommonService, private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.selCate) {
        this.getSelectedCategoryProduct(params.selCate)
      }
      else {
        this.getAllProduct()
      }
    })
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
    this.route.navigate(['/details'], { queryParams: { 'ProductId': item.id } })
  }
}