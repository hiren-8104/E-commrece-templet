import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  @Input() parentData :any =null;
  @Input() customClass: any;
  
  constructor(private common : CommonService) { }

  ngOnInit(): void {
    
  }

}
