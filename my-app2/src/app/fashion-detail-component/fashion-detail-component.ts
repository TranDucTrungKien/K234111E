import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail-component.html',
  styleUrl: './fashion-detail-component.css'
})
export class FashionDetailComponent implements OnInit {
  fashion: any = null;
  errMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get<any>(`http://localhost:5000/fashions/${id}`).subscribe({
        next: data => this.fashion = data,
        error: err => this.errMessage = 'Không tìm thấy sản phẩm thời trang.'
      });
    }
  }

  parse_image(img: string): string {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    return 'http://localhost:5000/images/' + img;
  }

  goBack() {
    this.router.navigate(['/ex53']);
  }
}
