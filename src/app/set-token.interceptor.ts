import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { StorageService } from './shared/services/storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SetTokenInterceptor implements HttpInterceptor {

  constructor(private Storage: StorageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.Storage.getStorageItem("token")
    if (token) {
      request = request.clone({ setHeaders: { "token": token } })
    }
    return next.handle(request)
  }
}
