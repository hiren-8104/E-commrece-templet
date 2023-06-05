import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { logInEndPoint, logoutEndPoint, registreEndPoint } from '../constant/apiEndPoint';
import { StorageService } from './storage.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private storage: StorageService) { }
  logIn(params: any): Observable<any> {
    // console.log(this.isValidToken())
    return this.http.postReq(logInEndPoint, params)
  }
  registratoin(body: any): Observable<any> {
    return this.http.postReq(registreEndPoint, body)
  }
  logout(): Observable<any> {
    return this.http.getReq(logoutEndPoint)
  }

  isValidToken() {
    let validetors:any[] = ["_id", "email","iat"]
    let token = this.storage.getStorageItem("token")
    if (token) {
      let decodeToken: any = jwtDecode(token)
      validetors.forEach((ele:string) => {
        if (!(ele in decodeToken)) {
          console.log("@@@@@@@@@@@@@@@@@@@@@@@@",ele)
          return 
        }
      })
      return true
    }
    return false
  }

}
