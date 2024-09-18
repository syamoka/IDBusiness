import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { loginGuard } from '../../../auth/guards/login/login.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  additionalData$ = this.authService.getUserData();
  constructor() {
    this.additionalData$.subscribe((res) => {
      console.log(res, 'Res');
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
