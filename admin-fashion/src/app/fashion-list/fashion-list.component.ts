import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FashionService, Fashion } from '../fashion.service';

@Component({
  selector: 'app-fashion-list',
  templateUrl: './fashion-list.component.html',
  styleUrls: ['./fashion-list.component.css']
})
export class FashionListComponent implements OnInit {
  fashions: Fashion[] = [];
  errMessage = '';

  constructor(private fashionService: FashionService, private router: Router) {}

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions(): void {
    this.fashionService.getAll().subscribe({
      next: data => this.fashions = data,
      error: err => this.errMessage = 'Cannot load fashions: ' + err.message
    });
  }

  viewDetail(id: string): void {
    this.router.navigate(['/fashions', id]);
  }

  editFashion(id: string): void {
    this.router.navigate(['/fashions/edit', id]);
  }

  deleteFashion(id: string, title: string): void {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    this.fashionService.delete(id).subscribe({
      next: () => this.loadFashions(),
      error: err => this.errMessage = 'Delete failed: ' + err.message
    });
  }

  addNew(): void {
    this.router.navigate(['/fashions/new']);
  }
}
