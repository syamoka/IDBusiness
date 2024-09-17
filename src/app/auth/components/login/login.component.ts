import { Component, inject, OnDestroy, signal } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly destroy$: Subject<any> = new Subject();
  private readonly router = inject(Router);

  private readonly fb = inject(FormBuilder);
  showPassword = signal(false);
  public loginForm = this.fb.group({});
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
        username: '37493333333',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.showPassword.set(true);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
