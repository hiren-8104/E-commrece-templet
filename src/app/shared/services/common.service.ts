import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  selectedCategory:any=new BehaviorSubject<any>('')
  constructor(private http:HttpService) { }

  getCategory():Observable<any>{
    return this.http.getReq('https://fakestoreapi.com/products/categories')
  }

getProduct(params?:any):Observable<any>{
  return this.http.getReq('https://fakestoreapi.com/products?limit=' + params )
}

getSpeicalCategory(params?:any):Observable<any>{
  return this.http.getReq('https://fakestoreapi.com/products/category/'+params)
}

getSelectedProduct(id: number):Observable<any>{
  return this.http.getReq('https://fakestoreapi.com/products/'+id)
    
}

getCartItem(params:any):Observable<any>{
  return this.http.getReq('https://fakestoreapi.com/carts/'+params)
}


}
