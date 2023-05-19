import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { OffersComponent } from './components/offers/offers.component';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    OffersComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports: [
    OffersComponent,
    ProductComponent
  ]
})
export class SharedModule { }
