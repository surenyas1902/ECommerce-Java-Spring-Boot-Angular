import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './products/cart-details/cart-details.component';
import { CheckoutComponent } from './products/checkout/checkout.component';
import { DetailsComponent } from './products/details/details.component';
import { HomeComponent } from './products/home/home.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'products/:id', component: DetailsComponent },
  { path: 'search/:keyword', component: HomeComponent },
  { path: 'category/:id', component: HomeComponent },
  { path: 'category', component: HomeComponent },
  { path: 'products', component: HomeComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
