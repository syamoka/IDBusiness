import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CheckPhone, Login, Token } from './model';
import { map, Observable } from 'rxjs';
import { CountryCodeInterface } from '../../models/country-code.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);

  checkPhone(body: CheckPhone) {
    return this.http.post<Token>(`${environment.API_URL}checkPhone`, body);
  }

  login(body: Login): Observable<Token> {
    return this.http.post<Token>(`${environment.API_URL}login`, body);
  }

  getUserData() {
    return this.http.get(`${environment.API_URL}getUserData`);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  isAuthenticated(): string | null {
    return localStorage && localStorage.getItem('token');
  }
  public getCountryCode(): Observable<CountryCodeInterface[]> {
    return this.http
      .get<{ message: string; result: CountryCodeInterface[] }>(
        `${environment.API_URL}GetCountryCode`
      )
      .pipe(map((e) => e.result));
  }
}
