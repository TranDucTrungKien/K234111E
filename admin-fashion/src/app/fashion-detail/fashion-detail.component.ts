import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionService, Fashion } from '../fashion.service';

@Component({
  selector: 'app-fashion-detail',
  templateUrl: './fashion-detail.component.html',
  styleUrls: ['./fashion-detail.component.css']
})
export class FashionDetailComponent implements OnInit {
  fashion: Fashion | null = null;
  errMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fashionService: FashionService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fashionService.getById(id).subscribe({
        next: data => this.fashion = data,
        error: err => this.errMessage = 'Load failed: ' + err.message
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/fashions']);
  }

  editFashion(): void {
    this.router.navigate(['/fashions/edit', this.fashion?._id]);
  }
}
