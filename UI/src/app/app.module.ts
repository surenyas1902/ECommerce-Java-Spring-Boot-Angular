import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './products/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { MenuComponent } from './products/menu/menu.component';
import { SearchComponent } from './products/search/search.component';
import { DetailsComponent } from './products/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CartStatusComponent } from './products/cart-status/cart-status.component';
import { CartDetailsComponent } from './products/cart-details/cart-details.component';
import { CheckoutComponent } from './products/checkout/checkout.component';
import { ShopFormServiceService } from './services/shop-form-service.service';
import { CheckoutService } from './services/checkout.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    SearchComponent,
    DetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot()
  ],
  providers: [ ProductService, ShopFormServiceService, CheckoutService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
