import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }


  getReq(url: string, params?: any, page?: any): Observable<any> {
    return this.http.get(url, params)
  }

  postReq(url: string, body: any): Observable<any> {
    
    return this.http.post(url, body)
  }
  deleteReq(url: string ,params?: any): Observable<any> {
    return this.http.delete(url,params)
  }

  putReq(url: string, body?: any): Observable<any> {
    return this.http.put(url, body)
  }

}
