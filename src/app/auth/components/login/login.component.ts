import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LanguageService } from '../../../shared/services/language/language.service';
import { AsyncPipe } from '@angular/common';
import { LanguageDirective } from '../../../shared/directives/language.directive';
import { CountryCodeInterface } from '../../models/country-code.interface';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, LanguageDirective, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly languageService = inject(LanguageService);
  private readonly destroy$: Subject<any> = new Subject();
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  showPassword = signal(false);
  public loginForm = this._initForm();
  public readonly supportedLanguages = this.languageService.supportedLanguages;
  public readonly countryCodes$ = this.authService.getCountryCode();
  public showCountryCodes: boolean = false;
  protected login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login({
        username: '37493333333',
        password: 'password1',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
        },
      });
  }

  checkPhone() {
    this.authService
      .checkPhone({
        username: this._formatPhoneNumber(),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.showPassword.set(true);
        },
      });
  }

  private _initForm() {
    return this.fb.record({
      phone: ['93333333'],
      code: ['374'],
      password: '',
    });
  }

  private _formatPhoneNumber() {
    return `${this.loginForm.get('code')?.value}${
      this.loginForm.get('phone')?.value
    }`;
  }

  public openCountryCodeDropdown() {
    this.showCountryCodes = true;
  }

  public closeDropdown() {
    this.showCountryCodes = false;
  }

  public selectCountryCode(code: CountryCodeInterface) {
    this.loginForm.get('code')?.setValue(code.countryCode.toString());
    this.closeDropdown();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
