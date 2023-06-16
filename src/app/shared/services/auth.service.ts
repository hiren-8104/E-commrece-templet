import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { forgrtPasswordEndPoint, logInEndPoint, logoutEndPoint, reNewTokenEndPoint, registreEndPoint, resetPasswordEndPoint } from '../constant/apiEndPoint';
import { StorageService } from './storage.service';
import jwtDecode from 'jwt-decode';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private storage: StorageService, private router: Router) { }
  logIn(params: any): Observable<any> {

    return this.http.postReq(logInEndPoint, params)
  }
  registratoin(body: any): Observable<any> {
    return this.http.postReq(registreEndPoint, body)
  }
  logout(): Observable<any> {
    return this.http.getReq(logoutEndPoint)
  }


  forgetpassword(body: any): Observable<any> {
    return this.http.postReq(forgrtPasswordEndPoint, body)
  }
  resetpassword(body: any): Observable<any> {
    return this.http.postReq(resetPasswordEndPoint, body)
  }

  RenewToken(): Observable<any> {
    return this.http.postReq(reNewTokenEndPoint, null)
  }




  deCodeToken() {
    let token = this.storage.getStorageItem("token")
    if (token) {

      let decodeToken: any = jwtDecode(token)
      console.log('email' in decodeToken);
      const expiryTime = new Date(decodeToken.exp * 1000)
      const atTime = new Date()
      const toeknExTime = moment(expiryTime).subtract(15, 'minutes')
      let diff = moment(toeknExTime).diff(atTime, 'minutes')
      console.log(diff);

      if ("email" in decodeToken && diff > 0) {
        console.log("generated NEW token");
        return decodeToken
      }
      else if ("email" in decodeToken && diff <= 0) {
        this.RenewToken().subscribe({
          next: (res: any) => {
            console.log("generated NEW token");

            this.storage.setStorageItem("token", res.token)

          }
        })
      }
      else {
        return false
      }
    }
    else {
      return false
    }

  }

}
