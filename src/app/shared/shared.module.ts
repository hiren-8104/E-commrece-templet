import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { OffersComponent } from './components/offers/offers.component';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { RatingComponent } from './components/rating/rating.component';
import { ImgconcatePipe } from './pipes/imgconcate.pipe';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    OffersComponent,
    ProductComponent,
    SearchFilterPipe,
    RatingComponent,
    ImgconcatePipe,
    

  ],
  imports: [
    // BrowserModule,
    CommonModule,
    RouterModule,
    NgxPaginationModule

  ],
  exports: [
    OffersComponent,
    ProductComponent,
    ImgconcatePipe

  ],
  providers: [
    
  ]
})
export class SharedModule { }
