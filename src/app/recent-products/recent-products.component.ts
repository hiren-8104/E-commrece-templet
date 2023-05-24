import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent-products',
  templateUrl: './recent-products.component.html',
  styleUrls: ['./recent-products.component.scss']
})
export class RecentProductsComponent implements OnInit {

  productList: any[] = []
  hiren!: string | null;
  constructor(private route: Router) { }

  ngOnInit(): void {
    let recentsProduct: any = localStorage.getItem('recentsViewProduct')
    this.productList = JSON.parse(recentsProduct)
  }


}
