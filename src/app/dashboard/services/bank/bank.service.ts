import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private readonly http = inject(HttpClient);

  getBankAccounts(): Observable<any> {
    return this.http.get(`${environment.API_URL}getBankAccounts`);
  }
  getAdditionalData(): Observable<any> {
    return this.http.get(`${environment.API_URL}getAdditionalData`);
  }
  getTransactions(): Observable<any> {
    return this.http.get(`${environment.API_URL}getTransactions`);
  }
}
