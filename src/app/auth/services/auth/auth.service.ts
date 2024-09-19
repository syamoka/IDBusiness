import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CheckPhone, Login, Token } from './model';
import { map, Observable, shareReplay } from 'rxjs';
import { ICountryCode } from '../../models/country-code.interface';
import { IUserData } from '../../../dashboard/dashboard/models/user-data.interface';

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

  getUserData(): Observable<IUserData> {
    return this.http
      .get<{ message: string; result: IUserData }>(
        `${environment.API_URL}getUserData`
      )
      .pipe(map((e) => e.result));
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  isAuthenticated(): boolean {
    return localStorage && !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage && localStorage.getItem('token');
  }
  public getCountryCode(): Observable<ICountryCode[]> {
    return this.http
      .get<{ message: string; result: ICountryCode[] }>(
        `${environment.API_URL}GetCountryCode`
      )
      .pipe(
        map((e) => e.result),
        shareReplay(1)
      );
  }

  logout() {
    localStorage.clear();
  }
}
