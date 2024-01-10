import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  searchGarage(data: any) {
    const params = {
      start: data.start,
      end: data.end
    }
    return this.http.get(
      'http://localhost:3000/api/garage', { params }
    );
  }
}
