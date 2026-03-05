import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Ptb2 } from './ptb2/ptb2';
import { FormsModule } from '@angular/forms';
import { Learndirective } from './learndirective/learndirective';
import { Listcustomer } from './listcustomer/listcustomer';
import { CommonModule } from '@angular/common';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Customerdetail } from './customerdetail/customerdetail';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
import { HttpClientModule } from '@angular/common/http';
import { About } from './about/about';
import { Notfound } from './notfound/notfound';
import { Listproduct } from './listproduct/listproduct';
import { Productdetail } from './productdetail/productdetail';
import { FakeProduct } from './fake-product/fake-product';
import { FakeProduct27 } from './fake-product27/fake-product27';
import { TickerEx28 } from './ticker-ex28/ticker-ex28';
import { BooksComponent } from './books-component/books-component';
import { BookDetailComponent } from './book-detail-component/book-detail-component';
import { FileUpload } from './file-upload/file-upload';
import { Newbook } from './newbook/newbook';
import { FashionComponent } from './fashion-component/fashion-component';
import { FashionDetailComponent } from './fashion-detail-component/fashion-detail-component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    App,
    Ptb2,
    Learndirective,
    Listcustomer,
    Listcustomer2,
    Customerdetail,
    Listcustomer3,
    About,
    Notfound,
    Listproduct,
    Productdetail,
    FakeProduct,
    FakeProduct27,
    TickerEx28,
    BooksComponent,
    BookDetailComponent,
    FileUpload,
    Newbook,
    FashionComponent,
    FashionDetailComponent,
    LoginComponent,
    ProductsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
