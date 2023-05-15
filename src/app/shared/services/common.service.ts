import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpService) { }

  getCategory():Observable<any>{
    return this.http.getReq('https://fakestoreapi.com/products/categories')
  }

getProduct(params?:any):Observable<any>{
  return this.http.getReq('https://fakestoreapi.com/products?limit=' + params )
}


}
