import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IProviderResponse } from '../interfaces/provider';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  getCompanies(name: string, page: number = 0): Observable<IProviderResponse> {
    const URL = `http://localhost:3000/providers?name=${name}&page=${page}`;
    return this.http.get<IProviderResponse>(URL);
  }

}
