import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { OffersComponent } from './components/offers/offers.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    OffersComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    OffersComponent,
    ProductComponent
  ]
})
export class SharedModule { }
