import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public readonly supportedLanguages = [
    { id: 'ru', value: 'РУ' },
    { id: 'am', value: 'ՀԱՅ' },
    { id: 'en', value: 'EN' },
  ];
  selectedLanguage = localStorage.getItem('lang') || 'am';

  saveLanguage(lang: string) {
    localStorage.setItem('lang', lang);
  }
}
