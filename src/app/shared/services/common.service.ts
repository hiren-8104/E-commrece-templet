import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, ReplaySubject, Subject, map } from 'rxjs';
import { ProductEndPoint, categoryEndPoint, filterListEndPoint, heroSectionEndPoint, newsLatterEndPoint, specialCategoryEndPoint, vendorsEndPoint } from '../constant/apiEndPoint';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  paginationsService = new BehaviorSubject<any>({ itemsPerPage: 6, currentPage: 1, totalItems: 20 })
  offerDataService = new ReplaySubject<any>()

  checkoutData = new BehaviorSubject<any>(null)
  searchfilters = new BehaviorSubject<any>('')
  currncypipe = new BehaviorSubject<any>("$")
  favouritesProductsService = new BehaviorSubject<any>('')
  breadcrumbs = new BehaviorSubject<any>([{ label: "Home", route: "/" }]);
  recentProducts = new BehaviorSubject<any>([])

  constructor(private http: HttpService ) { }

  

  getProduct(body?: any): Observable<any> {
    return this.http.postReq(ProductEndPoint, body)
  }

  getSpeicalCategory(params?: any): Observable<any> {
    return this.http.getReq(specialCategoryEndPoint + params)
  }

  getSelectedProduct(id: number): Observable<any> {
    // console.log("getSelectedProduct", id)
    return this.http.postReq(ProductEndPoint +"/" + id,null)

  }

  getCartItem(): Observable<any> {
    return this.http.getReq('http://192.168.1.178:3000/cart')
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

  addIntoCart(body: any): Observable<any> {
    return this.http.postReq('http://192.168.1.178:3000/cart/add-product',body)
  }
  
  


}
