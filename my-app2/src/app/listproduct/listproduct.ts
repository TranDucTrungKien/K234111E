import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-listproduct',
  standalone: false,
  templateUrl: './listproduct.html',
  styleUrl: './listproduct.css',
})
export class Listproduct {
  products = [
    { id: 1, name: 'Product A', price: -100, image: '/images/shin1.jpg' },
    { id: 2, name: 'Product B', price: 200, image: '/images/shin2.jpg' },
    { id: 3, name: 'Product C', price: 300, image: '/images/shin3.jpg' },
  ];

  selected_id: any;
  // Dùng Router để điều hướng
  // Dùng ActivatedRoute để nhận điều hướng
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((params) => {
      this.selected_id = params['id'];
      console.log(params['id'])
    })
  }
  view_detail(id: number) {
    console.log("View detail for product:", id);
    this.router.navigate(['/san-pham-1', id]);
  }
}
