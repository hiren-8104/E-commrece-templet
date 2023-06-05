import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  
  
  getReq(url: string, params?: any ,page?:any): Observable<any> {
    return this.http.get(url, params)
  }

  postReq(url:string , body: any): Observable<any> {
    return this.http.post(url,body)
  }
}
