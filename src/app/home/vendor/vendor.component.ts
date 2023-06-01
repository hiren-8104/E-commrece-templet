import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorComponent implements OnInit {
  vendordata: any = {
   
  }
  config: SwiperOptions = {
   
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    allowSlideNext: true,
    // updateOnWindowResize
  };
  constructor(private common :CommonService , private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    
    this.getVenders()
  }

  getVenders(){
    this.common.getVenders().subscribe({
      next:(res)=>{
        // console.log(res)
        this.vendordata.vendorImg = res.data
        this.cdr.markForCheck()
      }
    })
  }
}
