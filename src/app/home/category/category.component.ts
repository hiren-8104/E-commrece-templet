import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categorySectionData: any = []
  constructor(private commonService: CommonService, private route: Router) { }

  ngOnInit(): void {
    let listOfCategory = { isCategoryList: true }
    this.commonService.getProduct(listOfCategory).subscribe({
      next: (res) => {

        this.categorySectionData = res.data.categories
      },
      error: (res) => { console.log(res) }
    })
  }
  // select category
  selectedCate(item: any) {
    this.route.navigate(['/product'], { queryParams: { 'selCate': item } }
    )
  }

}
