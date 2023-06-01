import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  caroselItem=0
  
  heroSectionData: any = {
    carousel: []
  }

  constructor(private common :CommonService) { }

  ngOnInit(): void {
    this.getHeroData()
  }

  getHeroData(){
    this.common.getHeroSection().subscribe({
      next:(res)=>{
        // console.log(res.data.offers);
        this.heroSectionData.carousel =res.data.carousels
        this.heroSectionData.offers = res.data.offers
        this.common.offerDataService.next(res.data.offers)
      }
    })
  }
}
