import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionService, Fashion } from '../fashion.service';

@Component({
  selector: 'app-fashion-form',
  templateUrl: './fashion-form.component.html',
  styleUrls: ['./fashion-form.component.css']
})
export class FashionFormComponent implements OnInit {
  isEdit = false;
  fashionId = '';
  errMessage = '';

  fashion: Fashion = {
    title: '',
    detail: '',
    thumbnail: '',
    style: ''
  };

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fashionService: FashionService
  ) {}

  ngOnInit(): void {
    this.fashionId = this.route.snapshot.paramMap.get('id') || '';
    this.isEdit = !!this.fashionId;
    if (this.isEdit) {
      this.fashionService.getById(this.fashionId).subscribe({
        next: data => this.fashion = data,
        error: err => this.errMessage = 'Load failed: ' + err.message
      });
    }
  }

  save(): void {
    if (!this.fashion.title || !this.fashion.style) {
      this.errMessage = 'Title and Style are required.';
      return;
    }
    if (this.isEdit) {
      this.fashionService.update(this.fashionId, this.fashion).subscribe({
        next: () => this.router.navigate(['/fashions']),
        error: err => this.errMessage = 'Update failed: ' + err.message
      });
    } else {
      this.fashionService.create(this.fashion).subscribe({
        next: () => this.router.navigate(['/fashions']),
        error: err => this.errMessage = 'Create failed: ' + err.message
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/fashions']);
  }
}
