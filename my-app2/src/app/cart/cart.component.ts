import { Component, OnInit } from '@angular/core';
import { CartService } from '../myservices/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  itemCount: number = 0;
  selectedItems: {[key: string]: boolean} = {};
  errorMessage: string = '';
  isLoading: boolean = false;
  isUpdating: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.cartItems = response.cart;
          this.total = response.total;
          this.itemCount = response.itemCount;
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading cart:', error);
        this.errorMessage = 'Failed to load cart';
        this.isLoading = false;
      }
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      return;
    }

    this.isUpdating = true;
    this.cartService.updateCart(productId, quantity).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.loadCart(); // Reload cart to get updated totals
        }
        this.isUpdating = false;
      },
      error: (error: any) => {
        console.error('Error updating cart:', error);
        alert('Failed to update cart');
        this.isUpdating = false;
      }
    });
  }

  removeItem(productId: string): void {
    if (confirm('Are you sure you want to remove this item from cart?')) {
      this.cartService.removeFromCart(productId).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.loadCart();
            delete this.selectedItems[productId];
          }
        },
        error: (error: any) => {
          console.error('Error removing item:', error);
          alert('Failed to remove item from cart');
        }
      });
    }
  }

  removeSelectedItems(): void {
    const selectedProductIds = Object.keys(this.selectedItems).filter(
      id => this.selectedItems[id]
    );

    if (selectedProductIds.length === 0) {
      alert('Please select items to remove');
      return;
    }

    if (confirm(`Remove ${selectedProductIds.length} selected item(s)?`)) {
      let removedCount = 0;
      
      selectedProductIds.forEach((productId, index) => {
        this.cartService.removeFromCart(productId).subscribe({
          next: (response: any) => {
            removedCount++;
            delete this.selectedItems[productId];
            
            // Reload cart after all removals
            if (removedCount === selectedProductIds.length) {
              this.loadCart();
            }
          },
          error: (error: any) => {
            console.error('Error removing item:', error);
          }
        });
      });
    }
  }

  updateCart(): void {
    alert('Cart updated successfully!');
    this.loadCart();
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear the entire cart?')) {
      this.cartService.clearCart().subscribe({
        next: (response: any) => {
          if (response.success) {
            this.loadCart();
            this.selectedItems = {};
          }
        },
        error: (error: any) => {
          console.error('Error clearing cart:', error);
          alert('Failed to clear cart');
        }
      });
    }
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }

  getSubtotal(item: any): number {
    return item.price * item.quantity;
  }

  toggleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.cartItems.forEach(item => {
      this.selectedItems[item.productId] = isChecked;
    });
  }

  isAllSelected(): boolean {
    return this.cartItems.length > 0 && 
           this.cartItems.every(item => this.selectedItems[item.productId]);
  }

  getTotalProductCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }
}
