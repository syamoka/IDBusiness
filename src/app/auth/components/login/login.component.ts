import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, provideRouter } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LanguageService } from '../../../shared/services/language/language.service';
import { AsyncPipe } from '@angular/common';
import { LanguageDirective } from '../../../shared/directives/language.directive';
import { ICountryCode } from '../../models/country-code.interface';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    LanguageDirective,
    AsyncPipe,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly languageService = inject(LanguageService);
  private readonly destroy$: Subject<any> = new Subject();
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly translateService = inject(TranslateService);
  public readonly phoneNumberMinLength = 8;
  public readonly supportedLanguages = this.languageService.supportedLanguages;
  public readonly countryCodes$ = this.authService.getCountryCode();

  public loginForm = this.initForm();
  public showPassword = signal(false);
  public showCountryCodes: boolean = false;
  public showPasswordAsText = false;
  protected login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.authService
      .login({
        username: this.formatPhoneNumber(),
        password: this.loginForm.get('password')?.value as string,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['dashboard']);
        },
      });
  }

  checkPhone() {
    if (this.loginForm.get('phone')?.invalid) {
      return;
    }
    this.authService
      .checkPhone({
        username: this.formatPhoneNumber(),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.showPassword.set(true);
        },
        error: (err) => {
          this.loginForm
            .get('phone')
            ?.setErrors({ invalidPhoneNumber: err.error.message });
        },
      });
  }

  private initForm() {
    return this.fb.group({
      phone: [
        '',
        [Validators.required, Validators.minLength(this.phoneNumberMinLength)],
      ],
      code: ['374'],
      password: ['', [Validators.required]],
    });
  }

  private formatPhoneNumber() {
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

  public selectCountryCode(code: ICountryCode) {
    this.loginForm.get('code')?.setValue(code.countryCode.toString());
    this.closeDropdown();
  }

  public passwordInputType() {
    this.showPasswordAsText = !this.showPasswordAsText;
  }

  setLanguage(lang: { id: string; value: string }) {
    this.translateService.use(lang.id);
    this.languageService.saveLanguage(lang.id);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
