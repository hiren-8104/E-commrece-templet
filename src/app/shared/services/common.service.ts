import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { currencyRate } from '../interface/currncy';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  allHidden = new BehaviorSubject<boolean>(true);
  checkoutData = new BehaviorSubject<any>(null)
  searchfilters = new BehaviorSubject<any>('')
  currncypipe = new BehaviorSubject<currencyRate>({name: "USD",rate: 1})
  favouritesProductsService = new BehaviorSubject<any>('')
  breadcrumbs = new BehaviorSubject<any>([{ label: "Home", route: "/" }]);
  recentProducts = new BehaviorSubject<any>([])

  constructor(private http: HttpService) { }


  getCategory(): Observable<any> {
    return this.http.getReq('https://fakestoreapi.com/products/categories')
  }

  getProduct(params?: any): Observable<any> {
    return this.http.getReq('https://fakestoreapi.com/products?limit=' + params)
  }

  getSpeicalCategory(params?: any): Observable<any> {
    return this.http.getReq('https://fakestoreapi.com/products/category/' + params)
  }

  getSelectedProduct(id: number): Observable<any> {
    return this.http.getReq('https://fakestoreapi.com/products/' + id)

  }

  getCartItem(params: any): Observable<any> {
    return this.http.getReq('https://fakestoreapi.com/carts/' + params)
  }

  getSort(params: any): Observable<any> {
    return this.http.getReq('https://fakestoreapi.com/products', { params })
  }
  getCurrncyrate(params: any): Observable<any> {
    return this.http.getReq("https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD&currencies=" + params)
  }


}
