import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './products/home/home.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { MenuComponent } from './products/menu/menu.component';
import { SearchComponent } from './products/search/search.component';
import { DetailsComponent } from './products/details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    SearchComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    PaginationModule.forRoot()
  ],
  providers: [ ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
