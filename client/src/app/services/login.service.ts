import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost:8081/api/';
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl + 'auth/login', model);
  }
}
