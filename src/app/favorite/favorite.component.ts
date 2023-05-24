import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
  
})
export class FavoriteComponent implements OnInit {

  data: any = []
  constructor(private commonService: CommonService  , private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
  
        let favouriteProducts: any = localStorage.getItem('favorite');
        if (favouriteProducts) {
          this.data = JSON.parse(favouriteProducts)
          this.cdr.markForCheck();
        }
    




  }




}
