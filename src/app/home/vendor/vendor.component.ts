import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendordata: any = {
    vendorImg: ["assets/img/vendor-1.jpg", "assets/img/vendor-2.jpg", "assets/img/vendor-3.jpg", "assets/img/vendor-4.jpg", "assets/img/vendor-5.jpg", "assets/img/vendor-6.jpg", "assets/img/vendor-7.jpg", "assets/img/vendor-8.jpg"]
  }
  config: SwiperOptions = {
   
    autoplay: true,
    loop: true,
    spaceBetween: 30,
  };
  constructor() { }

  ngOnInit(): void {

  }

}
