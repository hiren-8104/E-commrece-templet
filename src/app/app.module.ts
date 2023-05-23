import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllproductComponent } from './allproduct/allproduct.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreacrumbComponent } from './breacrumb/breacrumb.component';
import { FavoriteComponent } from './favorite/favorite.component';


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ProductDetailsComponent,
    AllproductComponent,
    ShopingCartComponent,
    CheckoutComponent,
    PageNotFoundComponent,
    BreacrumbComponent,
    FavoriteComponent,
   
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    
    NgxUsefulSwiperModule,
    NgxPaginationModule,
   



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
