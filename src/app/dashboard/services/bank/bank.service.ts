import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, retry } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { IBankAccount } from '../../dashboard/models/bank-acount.interface';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private readonly http = inject(HttpClient);

  getBankAccounts(): Observable<IBankAccount[]> {
    return this.http
      .get<{ message: string; result: IBankAccount[] }>(
        `${environment.API_URL}getBankAccounts`
      )
      .pipe(
        map(
          (data) => {
            return data.result;
          },
          catchError((error) => of([]))
        )
      );
  }
  getAdditionalData(): Observable<{ description: string }> {
    return this.http
      .get<{ message: string; result: { description: string } }>(
        `${environment.API_URL}getAdditionalData`
      )
      .pipe(
        map((data) => data.result),
        catchError((error) => of({ description: '' }))
      );
  }
  getTransactions(): Observable<any> {
    return this.http
      .get(`${environment.API_URL}getTransactions`)
      .pipe(catchError((error) => of([])));
  }
  fetchAllData() {
    return forkJoin({
      bankAccounts: this.getBankAccounts(),
      transactions: this.getTransactions(),
      additionalData: this.getAdditionalData(),
    }).pipe(
      catchError((err) =>
        of({
          bankAccounts: [],
          transactions: [],
          additionalData: { description: '' },
        })
      ),
      retry(2)
    );
  }
}
