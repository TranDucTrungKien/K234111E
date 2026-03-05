import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) { }

  // Get all products
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`, { 
      withCredentials: true 
    });
  }

  // Get product by ID
  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}`, {
      withCredentials: true
    });
  }
}
