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
  constructor(private commonService: CommonService ,private route: Router) { }

  ngOnInit(): void {
    this.commonService.getCategory().subscribe({
      next: (res) => {
        res.forEach((ele: any) => {
          this.categorySectionData.push({
            cateImg: 'assets/img/cat-2.jpg',
            cateName: ele,
            cateQuntity: "100 Products"
          })
        })
      },
      error:(res)=>{console.log(res)}
    })
  }
// select category
  selectedCate(item:any){
    console.log(item , ":_____________________")
    this.route.navigate(['/product'],{queryParams:{'selCate':item}}
    )
  }

}
