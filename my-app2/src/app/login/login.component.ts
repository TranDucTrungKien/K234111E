import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../myservices/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  
  // Cookie information
  cookieUser: any = null;
  hasCookie: boolean = false;

  apiUrl = 'http://localhost:3002';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Check cookie khi component load
    this.checkLoginCookie();
  }

  // Kiểm tra cookie login
  checkLoginCookie() {
    this.http.get<any>(`${this.apiUrl}/check-login`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          if (response.success && response.isLoggedIn) {
            this.hasCookie = true;
            this.cookieUser = response.user;
          } else {
            this.hasCookie = false;
            this.cookieUser = null;
          }
        },
        error: (error) => {
          console.error('Error checking cookie:', error);
          this.hasCookie = false;
        }
      });
  }

  onLogin() {
    this.errorMessage = '';
    
    // Validate input
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    this.isLoading = true;

    // Gọi service để login với credentials để nhận cookie
    this.http.post<any>(`${this.apiUrl}/login`, 
      { username: this.username, password: this.password },
      { withCredentials: true }
    ).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.isLoading = false;
        
        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', this.username);
        
        // Check cookie lại để hiển thị
        this.checkLoginCookie();
        
        // Clear form
        this.username = '';
        this.password = '';
        
        // Điều hướng sang trang fashion sau 1.5 giây
        setTimeout(() => {
          this.router.navigate(['/ex53']);
        }, 1500);
      },
      error: (error: any) => {
        console.error('Login error:', error);
        this.isLoading = false;
        
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      }
    });
  }

  onRegister() {
    this.errorMessage = '';
    
    // Validate input
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.isLoading = true;

    // Gọi service để register
    this.authService.register(this.username, this.password).subscribe({
      next: (response: any) => {
        console.log('Registration successful:', response);
        this.isLoading = false;
        alert('Registration successful! You can now login.');
        this.password = ''; // Clear password
      },
      error: (error: any) => {
        console.error('Registration error:', error);
        this.isLoading = false;
        
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      }
    });
  }

  // Clear cookie / Logout
  clearCookie() {
    this.http.post<any>(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log('Cookie cleared:', response);
          this.hasCookie = false;
          this.cookieUser = null;
          
          // Clear localStorage
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('username');
          
          alert('Cookies cleared successfully!');
        },
        error: (error) => {
          console.error('Error clearing cookie:', error);
        }
      });
  }
}
