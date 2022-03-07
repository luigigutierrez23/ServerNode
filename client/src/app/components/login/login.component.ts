import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
  constructor(
    private loginService:LoginService,
    private router:Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(){
  }

  ngOnDestroy(){
  }

  login(){
    this.loginService.login(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.msg)
      }
    })
  }
}
