import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Authentication Service
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) { }

  // API Register
  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username: username,
      password: password
    });
  }

  // API Login
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      username: username,
      password: password
    });
  }

  // Kiểm tra trạng thái đăng nhập
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Logout
  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
  }

  // Lấy username hiện tại
  getCurrentUsername(): string | null {
    return localStorage.getItem('username');
  }
}
