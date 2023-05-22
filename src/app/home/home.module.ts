import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { FeaturedComponent } from './featured/featured.component';
import { HeroComponent } from './hero/hero.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { VendorComponent } from './vendor/vendor.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { RecentProductsComponent } from '../recent-products/recent-products.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeComponent,
    FeaturedComponent,
    HeroComponent,
    CategoryComponent,
    VendorComponent,
    RecentProductsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxUsefulSwiperModule,
    NgxPaginationModule
    
  ]
})
export class HomeModule { }
