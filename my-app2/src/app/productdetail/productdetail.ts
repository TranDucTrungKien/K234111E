import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productdetail',
  standalone: false,
  templateUrl: './productdetail.html',
  styleUrl: './productdetail.css',
})
export class Productdetail {
  products = [
    { id: 1, name: 'Product A', price: 100, image: '/images/shin1.jpg' },
    { id: 2, name: 'Product B', price: 200, image: '/images/shin2.jpg' },
    { id: 3, name: 'Product C', price: 300, image: '/images/shin3.jpg' },
  ];

  product_selected: any;
  // Dùng Router để điều hướng
  // Dùng ActivatedRoute để nhận điều hướng
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((params) => {
      let id = params['id'];
      this.product_selected = this.products.find((p) => p.id == id);
    });
  }
  goback() {
    this.router.navigate(['/san-pham-1',{id:this.product_selected.id}]);
  }
}
