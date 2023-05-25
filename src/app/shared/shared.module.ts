import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { OffersComponent } from './components/offers/offers.component';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { RatingComponent } from './components/rating/rating.component';



@NgModule({
  declarations: [
    OffersComponent,
    ProductComponent,
    SearchFilterPipe,
    RatingComponent
  
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule

  ],
  exports: [
    OffersComponent,
    ProductComponent
  ]
})
export class SharedModule { }
