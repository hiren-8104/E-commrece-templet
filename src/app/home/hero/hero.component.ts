import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  caroselItem=0
  heroSectionData: any = {
    carousel: [
      {
        img: 'assets/img/carousel-1.jpg',
        title: 'Men Fashion',
        sunTitle: 'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam'
      },
      {
        img: 'assets/img/carousel-2.jpg',
        title: 'Women Fashion',
        sunTitle: 'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam'
      },
      {
        img: 'assets/img/carousel-3.jpg',
        title: 'Kids Fashion',
        sunTitle: 'Lorem rebum magna amet lorem magna erat diam stet. Sadips duo stet amet amet ndiam elitr ipsum diam'
      },
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
