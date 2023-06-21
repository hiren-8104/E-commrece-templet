import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-breacrumb',
  templateUrl: './breacrumb.component.html',
  styleUrls: ['./breacrumb.component.scss']
})
export class BreacrumbComponent implements OnInit {

  constructor(public bread:CommonService,private cdr:ChangeDetectorRef) { }
  breads:any[]=[];
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.bread.breadcrumbs.subscribe(res=>{
      this.breads=res;
    })   
    this.cdr.markForCheck();
  }

}
