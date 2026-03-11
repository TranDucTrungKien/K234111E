import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionHomeComponent } from './fashion-home/fashion-home.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

const routes: Routes = [
  { path: '', component: FashionHomeComponent },
  { path: 'fashion/:id', component: FashionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

