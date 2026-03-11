import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FashionService, Fashion } from '../fashion.service';

@Component({
  selector: 'app-fashion-home',
  templateUrl: './fashion-home.component.html',
  styleUrls: ['./fashion-home.component.css']
})
export class FashionHomeComponent implements OnInit {
  allFashions: Fashion[] = [];
  fashions: Fashion[] = [];
  styles: string[] = [];
  selectedStyle = '';
  searchKeyword = '';
  errMessage = '';

  // Fashions grouped by style
  get groupedFashions(): { style: string; items: Fashion[] }[] {
    const map = new Map<string, Fashion[]>();
    for (const f of this.fashions) {
      if (!map.has(f.style)) map.set(f.style, []);
      map.get(f.style)!.push(f);
    }
    return Array.from(map.entries()).map(([style, items]) => ({ style, items }));
  }

  constructor(private fashionService: FashionService, private router: Router) {}

  ngOnInit(): void {
    this.fashionService.getStyles().subscribe({
      next: s => this.styles = s,
      error: () => {}
    });
    this.loadAll();
  }

  loadAll(): void {
    this.fashionService.getAll().subscribe({
      next: data => { this.allFashions = data; this.fashions = data; },
      error: err => this.errMessage = 'Cannot load fashions: ' + err.message
    });
  }

  filterByStyle(): void {
    if (!this.selectedStyle) {
      this.fashions = this.allFashions;
    } else {
      this.fashionService.getByStyle(this.selectedStyle).subscribe({
        next: data => this.fashions = data,
        error: err => this.errMessage = err.message
      });
    }
  }

  search(): void {
    const kw = this.searchKeyword.trim().toLowerCase();
    if (!kw) {
      this.fashions = this.allFashions;
      return;
    }
    this.fashions = this.allFashions.filter(
      f => f.title.toLowerCase().includes(kw) || f.style.toLowerCase().includes(kw)
    );
  }

  viewDetail(id: string): void {
    this.router.navigate(['/fashion', id]);
  }
}
