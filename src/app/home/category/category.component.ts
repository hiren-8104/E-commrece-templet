import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
categorySectionData:any=[
  {
    cateImg:'assets/img/cat-1.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-2.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-3.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-1.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },

  {
    cateImg:'assets/img/cat-2.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-2.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-3.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-3.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-4.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-3.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-2.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  },
  {
    cateImg:'assets/img/cat-1.jpg',
    cateName:'Category Name',
    cateQuntity:"100 Products"
  }
]
  constructor() { }

  ngOnInit(): void {
  }

}
