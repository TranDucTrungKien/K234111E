import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) { }

  // Add product to cart (session based)
  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/add`, {
      productId: productId,
      quantity: quantity
    }, {
      withCredentials: true // Important for session cookies
    });
  }

  // Get cart from session
  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart`, {
      withCredentials: true
    });
  }

  // Update cart item quantity
  updateCart(productId: string, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/update`, {
      productId: productId,
      quantity: quantity
    }, {
      withCredentials: true
    });
  }

  // Remove product from cart
  removeFromCart(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/remove`, {
      productId: productId
    }, {
      withCredentials: true
    });
  }

  // Clear entire cart
  clearCart(): Observable<any> {
    return this.http.post(`${this.apiUrl}/cart/clear`, {}, {
      withCredentials: true
    });
  }
}
