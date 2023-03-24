import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApihoraService {
  constructor(private client: HttpClient) {}

  getHora(): Observable<{ tempo: string }> {
    return this.client.get<{ tempo: string }>('http://localhost:5000/');
  }
}
