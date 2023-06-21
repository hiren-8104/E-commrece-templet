import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderDetails!: any

  constructor(private activeRoute: ActivatedRoute, public common: CommonService ) { }

  ngOnInit(): void {
    this.common.breadcrumbs.next(
      [
        { label: "Home", route: "/" },
        { label: "My Order", route: "orders" },
        { label: "Order Detail", route: "orders" }

      ])
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params['id']);
      this.common.getAllOrders(params['id']).subscribe({
        next: (res: any) => {

          console.log(res.data.orderDetail);
          this.orderDetails = res.data.orderDetail;
        }
      })

    })
  }

}
