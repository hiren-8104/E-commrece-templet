import { Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  data: any = []
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    let fav: any = localStorage.getItem('favorite');
    if (fav) {
      this.data = JSON.parse(fav)
    }

    
    
  }

  getFavouritesItem(){
    this.commonService.favouritesProducts.subscribe({
      next: (res: any[]) => {
        this.data = res.filter(item => item.isFavourite == true);
        localStorage.setItem('favorite', JSON.stringify(this.data));
      }
    })
  }
  
  
}
