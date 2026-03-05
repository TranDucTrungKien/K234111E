import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../myservices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Kiểm tra xem user đã login chưa
    if (this.authService.isLoggedIn()) {
      return true; // Cho phép truy cập
    } else {
      // Chưa login -> chuyển về trang login
      alert('Please login to access this page!');
      this.router.navigate(['/login']);
      return false; // Không cho phép truy cập
    }
  }
}
