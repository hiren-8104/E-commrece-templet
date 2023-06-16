import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject, map } from 'rxjs';
import { ProductEndPoint, addProductReviewEndPoint, cartEndPoint, categoryEndPoint, contactUsEndPoint, favoriteProductRemovingEndPoint, favoriteProductsEndPoint, filterListEndPoint, heroSectionEndPoint, newsLatterEndPoint, orderEndPoint, specialCategoryEndPoint, userAddressesEndPoint, vendorsEndPoint } from '../constant/apiEndPoint';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  paginationsService = new BehaviorSubject<any>({ itemsPerPage: 6, currentPage: 1, totalItems: 20 })
  offerDataService = new ReplaySubject<any>()
  totalfavoriteProductService = new BehaviorSubject<any>(0)
  totalCartProductService = new BehaviorSubject<any>(0)

  checkoutData = new BehaviorSubject<any>(null)
  searchfilters = new BehaviorSubject<any>('')
  currncypipe = new BehaviorSubject<any>("$")
  tokenService = new BehaviorSubject<any>(null)
  breadcrumbs = new BehaviorSubject<any>([{ label: "Home", route: "/" }]);
  recentProducts = new BehaviorSubject<any>([])

  constructor(private http: HttpService, private auth: AuthService, private route: Router, private toastrService: ToastrService) { }



  getProduct(body?: any): Observable<any> {
    return this.http.postReq(ProductEndPoint, body)
  }

  getSpeicalCategory(params?: any): Observable<any> {
    return this.http.getReq(specialCategoryEndPoint + params)
  }

  getSelectedProduct(id: number): Observable<any> {

    return this.http.postReq(ProductEndPoint + "/" + id, null)

  }

  getCartItem(): Observable<any> {
    return this.http.getReq(cartEndPoint)
  }


  getHeroSection(): Observable<any> {
    return this.http.getReq(heroSectionEndPoint)
  }
  getVenders(): Observable<any> {
    return this.http.getReq(vendorsEndPoint)
  }

  newsLatterSubscription(body: any): Observable<any> {
    return this.http.postReq(newsLatterEndPoint, body)
  }
  getFilterList(): Observable<any> {
    return this.http.getReq(filterListEndPoint)
  }

  // work as add to cart and update item like a item plus and minus
  addIntoCart(body: any): Observable<any> {
    return this.http.postReq(cartEndPoint, body)
  }


  removeCartItem(parmas: any, body?: any): Observable<any> {
    return this.http.deleteReq(cartEndPoint + '/remove/' + parmas, body)
  }
  getfavoriteProduct(): Observable<any> {
    return this.http.getReq(favoriteProductsEndPoint)
  }

  removefavoriteProduct(params: any): Observable<any> {
    return this.http.deleteReq(favoriteProductRemovingEndPoint + params)
  }
  addfavoritesProduct(params: any): Observable<any> {
    return this.http.getReq(favoriteProductsEndPoint + "/" + params)
  }


  addProductReview(body: any): Observable<any> {
    return this.http.postReq(addProductReviewEndPoint, body)
  }

  addUserAddress(body: any): Observable<any> {
    return this.http.postReq(userAddressesEndPoint + "/add", body)
  }
  getUserAddress(): Observable<any> {
    return this.http.getReq(userAddressesEndPoint)
  }

  removingAddress(params: any): Observable<any> {
    return this.http.deleteReq(userAddressesEndPoint + "/remove/" + params)
  }
  updateUserAddress(params: any, body: any): Observable<any> {
    return this.http.putReq(userAddressesEndPoint + "/update/" + params, body)
  }


  placeOrder(body: any): Observable<any> {
    return this.http.postReq(orderEndPoint, body)
  }

  getAllOrders(params: any = ''): Observable<any> {
    return this.http.getReq(orderEndPoint + "/" + params)
  }

  contactUs(body: any): Observable<any> {
    return this.http.postReq(contactUsEndPoint, body)
  }



  // common functions for a like and cart product
  commonFunctions(path: any) {
    if (this.auth.deCodeToken()) {
      this.route.navigate([`${path}`])
    }
    else {
      this.toastrService.warning(`Login and see your  ${path}`, "Please Login")
    }
  }


}
