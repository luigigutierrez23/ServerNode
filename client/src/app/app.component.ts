import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ASD';
  products: any;

  constructor(public http: HttpClient){

  }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this.http.get('http://localhost:8081/api/products').subscribe((res) => {
      this.products = res;
    });
  }

  ngOnDestroy(){}

}
