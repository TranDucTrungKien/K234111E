import { Component } from '@angular/core';

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.html',
  styleUrl: './listcustomer.css',
})
export class Listcustomer {
  customers = [
    { "id": "1", "name": 'Alice', "age": 30 , "picture" : "/images/shin1.jpg" },
    { "id": "2", "name": 'Bob', "age": 25 , "picture" : "/images/shin2.jpg" },
    { "id": "3", "name": 'Charlie', "age": 35 , "picture" : "/images/shin3.jpg" }
  ];
}
