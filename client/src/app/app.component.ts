import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  products: any;

  constructor(private loginService: LoginService){

  }

  ngOnInit(){
    this.loginService.isLogged.subscribe(res => {
      this.isLogged = res;
    })
  }

  ngOnDestroy(){}

}
