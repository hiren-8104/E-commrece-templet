import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService } from '../shared/services/common.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class FavoriteComponent implements OnInit {

  data: any = []
  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private storage: StorageService) { }

  ngOnInit(): void {
    this.getFavoriteProducts()

    // favourite products form local storage
    let favouriteProducts: any = this.storage.getStorageItem('favorite');
    if (favouriteProducts) {
      this.data = JSON.parse(favouriteProducts)
      this.cdr.detectChanges();
    }
  }

  // get favorite products form Behaviour
  getFavoriteProducts(): any {
    this.commonService.favouritesProductsService.subscribe({
      next: (res) => {
        this.data = res
      }
    })
  }



}
