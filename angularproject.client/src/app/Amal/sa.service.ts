import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaService {

  constructor(private _http: HttpClient) { }


  
  getdata(id: any) {
    return this._http.get<any>(`https://67e3fe882ae442db76d27d2c.mockapi.io/logged/${id}`);
  }

  postdata(id: any, data: any) {
    return this._http.post<any>(`https://67d5f9cd286fdac89bc0e100.mockapi.io/Registration/${id}`,data)
  }

  gethistory(id: any) {
    return this._http.get<any>(`https://67d293bd90e0670699be2936.mockapi.io/Order/${id}`);
  }
}
