import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private common: CommonService) { }

  ngOnInit(): void {
this.common.breadcrumbs.next([{label:"Home", route:"/"},{label:"Shop", route:"/Shop"},{label:"CheckOut", route:"checkout"}])
  }

}
