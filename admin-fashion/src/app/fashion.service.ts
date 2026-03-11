import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fashion {
  _id?: string;
  title: string;
  detail: string;
  thumbnail: string;
  style: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class FashionService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/fashions`);
  }

  getById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/fashions/${id}`);
  }

  getStyles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/styles`);
  }

  create(fashion: Fashion): Observable<Fashion> {
    return this.http.post<Fashion>(`${this.apiUrl}/fashions`, fashion);
  }

  update(id: string, fashion: Fashion): Observable<Fashion> {
    return this.http.put<Fashion>(`${this.apiUrl}/fashions/${id}`, fashion);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/fashions/${id}`);
  }
}
