import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdnanService {

  constructor(private _url: HttpClient) { }

  userBehavior = new BehaviorSubject<string>('');
  userObservable = this.userBehavior.asObservable();

  postNewUser(data: any): Observable<any> {
    return this._url.post("https://67d5f9cd286fdac89bc0e100.mockapi.io/Registration", data);
  }

  getAllUsers() {
    return this._url.get<any>("https://67d5f9cd286fdac89bc0e100.mockapi.io/Registration")
  }
  validateUser(userCredentials: any): Observable<any> {
    return this._url.post('https://67e3fe882ae442db76d27d2c.mockapi.io/logged', userCredentials);
  }

}
