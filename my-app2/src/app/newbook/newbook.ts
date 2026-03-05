import { Component } from '@angular/core';
import { BookAPIService } from '../myservices/book-apiservice';
import { Book } from '../myclasses/book';

@Component({
  selector: 'app-newbook',
  standalone: false,
  templateUrl: './newbook.html',
  styleUrl: './newbook.css',
})
export class Newbook {
  book=new Book();
  books:any
  errMessage:string=''
  constructor(private _service: BookAPIService){
    this._service.getBooks().subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }
  postBook()
  {
    this._service.postBook(this.book).subscribe({
      next:(data)=>{this.books=data},
      error:(err)=>{this.errMessage=err}
    })
  }
}

