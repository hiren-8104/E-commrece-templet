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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopCartComponent } from './shopcart/shopcart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreacrumbComponent } from './breacrumb/breacrumb.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { SetTokenInterceptor } from './set-token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    ProductDetailsComponent,
    ShopCartComponent,
    ShopingCartComponent,
    CheckoutComponent,
    PageNotFoundComponent,
    BreacrumbComponent,
    FavoriteComponent    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HomeModule,
    HttpClientModule,
    NgxUsefulSwiperModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
   
  
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: SetTokenInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
