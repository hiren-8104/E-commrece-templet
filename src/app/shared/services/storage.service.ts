import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

getStorageItem(key: string){
  return localStorage.getItem(key);
}

setStorageItem(key: string, value:any){
  localStorage.setItem(key, JSON.stringify(value))
}

}
