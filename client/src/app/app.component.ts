import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Login } from './models/login';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  currentUser$: Observable<Login>;

  constructor(public loginService: LoginService){}

  ngOnInit(){
    this.currentUser$ = this.loginService.currentUser$;
    console.log(this.currentUser$);

    this.setCurrentUser();
  }

  setCurrentUser() {
    const loginUser: Login = JSON.parse(localStorage.getItem('user'));
    this.loginService.setCurrentUser(loginUser);
  }

  ngOnDestroy(){}
}
