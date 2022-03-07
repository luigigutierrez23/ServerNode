import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Custom components */
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CategoryDetailComponent } from './components/categories/category-detail/category-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    runGuardsAndResolvers:'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/:id', component: CategoryDetailComponent },
    ]
  },
  { path: '**', component: HomeComponent, pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
