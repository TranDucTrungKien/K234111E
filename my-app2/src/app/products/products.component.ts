import { Component, OnInit } from '@angular/core';
import { ProductService } from '../myservices/product.service';
import { CartService } from '../myservices/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  addingToCart: {[key: string]: boolean} = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.products = response.products;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.errorMessage = 'Failed to load products';
        this.isLoading = false;
      }
    });
  }

  addToCart(product: any): void {
    this.addingToCart[product._id] = true;
    
    this.cartService.addToCart(product._id, 1).subscribe({
      next: (response: any) => {
        if (response.success) {
          alert(`${product.name} added to cart!`);
        }
        this.addingToCart[product._id] = false;
      },
      error: (error: any) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart');
        this.addingToCart[product._id] = false;
      }
    });
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
