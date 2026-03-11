import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fashion {
  _id: string;
  title: string;
  detail: string;
  thumbnail: string;
  style: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class FashionService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/fashions`);
  }

  getStyles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/styles`);
  }

  getByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/fashions/style/${encodeURIComponent(style)}`);
  }

  getById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/fashions/${id}`);
  }
}
