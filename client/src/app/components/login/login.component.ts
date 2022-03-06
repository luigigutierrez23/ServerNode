import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  model:any = {
    email:'',
    password:''
  };
  constructor(private loginService:LoginService) { }

  ngOnInit(){
  }

  ngOnDestroy(){
  }

  login(){
    this.loginService.login(this.model).subscribe({
      next: (res) => {
        this.loginService.isLogged.next(true);
        console.log(this.loginService.isLogged, res, "Logged In!!");
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
