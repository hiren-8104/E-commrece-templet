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

  data: any[] = []
  constructor(private commonService: CommonService, private cdr: ChangeDetectorRef, private storage: StorageService) { }

  ngOnInit(): void {
    this.getFavoriteProducts()


  }

  // get favorite products form Behaviour
  getFavoriteProducts(): any {
    this.commonService.getfavoriteProduct().subscribe({
      next: (res) => {
        
        this.data= res.data.products.map((ele:any)=>{
          return ele.product
        })
        console.log(this.data)
        this.cdr.markForCheck()

      },
      error: (err) => { console.log() }
    })
  }



}
