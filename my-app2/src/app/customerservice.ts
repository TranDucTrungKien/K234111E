import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Customerservice {
  customers = [
    { "id": "1", "name": 'Alice', "age": 30 , "picture" : "/images/shin1.jpg" },
    { "id": "2", "name": 'Bob', "age": 25 , "picture" : "/images/shin2.jpg" },
    { "id": "3", "name": 'Charlie', "age": 35 , "picture" : "/images/shin3.jpg" }
  ];
  constructor() {}
  get_all_customers() {
    return this.customers;
  }

  get_customer_detail(id: string) {
    let c=this.customers.find(x => x.id == id);
    return c;
  }

  filter_customers_by_age(a: number, b: number) {
    return this.customers.filter(c => c.age >= a && c.age <= b);
  }
}