import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpService) { }
  logIn(params:any):Observable<any>{
    return this.http.postReq('https://fakestoreapi.com/auth/login', params)
  }
}
