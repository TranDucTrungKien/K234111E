import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FashionListComponent } from './fashion-list/fashion-list.component';
import { FashionFormComponent } from './fashion-form/fashion-form.component';
import { FashionDetailComponent } from './fashion-detail/fashion-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FashionListComponent,
    FashionFormComponent,
    FashionDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
