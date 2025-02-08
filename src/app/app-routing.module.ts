import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  // {path:'', redirectTo: 'products', pathMatch: 'full'}, // Redirect to products
  {path: 'cart', component: CartComponent}, // Add this line
  {path: 'products', component: ProductListComponent}, // Add this line
  // {path: '**', redirectTo: 'products'}, // Redirect to products
  {path: 'form', component: FormComponent}, // Add this line
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
