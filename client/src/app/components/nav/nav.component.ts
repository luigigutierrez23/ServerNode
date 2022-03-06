import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'custom-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.isLogged.next(false);
  }

}
