import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyOrdersComponent implements OnInit {
  manageOrderData!: any
  constructor(public common: CommonService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.getOrderesList()
  }



  getOrderesList() {
    this.common.getAllOrders().subscribe({
      next: (res) => {
        console.log(res.data.orders, "asdhgjjjjjjjjjjjjjjjjjjjjjjj");

        this.manageOrderData = res.data.orders
        this.cdr.markForCheck()
      }
    })
  }
  viewOrder(id: any) {
    console.log("viewOrder", id);
    this.router.navigate(['/order-details'], { queryParams: { id } })


  }
}
