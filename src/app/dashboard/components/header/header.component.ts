import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth/auth.service';
import { loginGuard } from '../../../auth/guards/login/login.guard';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { LanguageService } from '../../../shared/services/language/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly languageService = inject(LanguageService);
  private readonly translateService = inject(TranslateService);
  supportedLanguages = this.languageService.supportedLanguages;
  userData$ = this.authService.getUserData();
  public isDropDownOpen: boolean = false;
  public companies = [
    {
      id: '1',
      company_name: 'Company LLC',
      role: 'Owner',
    },
    {
      id: '2',
      company_name: 'Company 2',
      role: 'Executive Director',
    },
    {
      id: '3',
      company_name: 'Company 2',
      role: 'Manager',
    },
    {
      id: '5',
      company_name: 'Company 2',
      role: 'Owner',
    },
  ];
  constructor() {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  public toggleDropDown() {
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  setLanguage(lang: { id: string; value: string }) {
    this.translateService.use(lang.id);
    this.languageService.saveLanguage(lang.id);
  }
}
