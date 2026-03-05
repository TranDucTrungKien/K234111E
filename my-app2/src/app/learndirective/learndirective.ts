import { Component } from '@angular/core';

@Component({
  selector: 'app-learndirective',
  standalone: false,
  templateUrl: './learndirective.html',
  styleUrl: './learndirective.css',
})
export class Learndirective {
  flag_value: number = 1;
  changeView() {
    if (this.flag_value == 1) {
      this.flag_value = 2;
    } 
    else {
      this.flag_value = 1;
    }
  }

  products=["Iphone","Samsung","Oppo","Nokia"];

  customers=[
    {id:101, name:"John", phone:"111", image:"images/shin1.jpg"},
    {id:102, name:"Smith", phone:"222", image:"images/shin2.jpg"},
    {id:103, name:"Kumar", phone:"333", image:"images/shin3.jpg"}
  ];
}
