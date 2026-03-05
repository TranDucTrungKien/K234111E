import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { About } from './about/about';
import { Listcustomer } from './listcustomer/listcustomer';
import { Listcustomer2 } from './listcustomer2/listcustomer2';
import { Listcustomer3 } from './listcustomer3/listcustomer3';
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
import { PaymentComponent } from './payment/payment.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path:"", redirectTo: "/products", pathMatch: "full"},
  {path:"products", component: ProductsComponent},
  {path:"cart", component: CartComponent},
  {path:"login", component: LoginComponent},
  {path:"gioi-thieu", component:About},
  {path:"khach-hang-1", component: Listcustomer},
  {path:"khach-hang-2", component: Listcustomer2},
  {path:"khach-hang-3", component: Listcustomer3},
  {path:"san-pham-1",component: Listproduct},
  {path:"san-pham-1/:id", component: Productdetail},
  {path:"ex26", component: FakeProduct},
  {path:"ex27", component: FakeProduct27},
  {path:"ex28", component: TickerEx28},
  {path:"ex39", component: BooksComponent},
  {path:"ex41", component: BookDetailComponent},
  {path:"ex41/:id", component: BookDetailComponent},
  {path:"ex43", component: Newbook},
  {path:"ex49", component: FileUpload},
  {path:"ex53", component: FashionComponent, canActivate: [AuthGuard]},
  {path:"ex53/:id", component: FashionDetailComponent, canActivate: [AuthGuard]},
  {path:"fashion", redirectTo: "/ex53", pathMatch: "full"},
  {path:"payment", component: PaymentComponent},
  {path:"payment-result", component: PaymentResultComponent},
  {path:"**", component: Notfound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
