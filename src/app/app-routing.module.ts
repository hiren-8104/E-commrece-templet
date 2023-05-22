import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './shared/components/product/product.component';
import { ContactComponent } from './contact/contact.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AllproductComponent } from './allproduct/allproduct.component';
import { ShopingCartComponent } from './shoping-cart/shoping-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FavoriteComponent } from './favorite/favorite.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'details',
    component: ProductDetailsComponent
  },
  {
    path: 'Shop',
    component: AllproductComponent
  },
  {
    path: 'Shop/:category',
    component: AllproductComponent
  },
  {
    path: "cart",
    component: ShopingCartComponent
  },
  {
    path: 'checkout',
    component:CheckoutComponent
  },
{
path:"favorites",
component: FavoriteComponent
},
{
  path:"notfound",
  component:PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
