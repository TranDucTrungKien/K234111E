import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionFormComponent } from './fashion-form/fashion-form.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/fashions', pathMatch: 'full' },
  { path: 'fashions', component: FashionListComponent },
  { path: 'fashions/new', component: FashionFormComponent },
  { path: 'fashions/edit/:id', component: FashionFormComponent },
  { path: 'fashions/:id', component: FashionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
