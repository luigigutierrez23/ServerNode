import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'custom-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {}

  logout(){
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
