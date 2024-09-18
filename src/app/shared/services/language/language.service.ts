import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  public readonly supportedLanguages = [
    { id: 'rus', value: 'РУ' },
    { id: 'arm', value: 'ՀԱՅ' },
    { id: 'en', value: 'EN' },
  ];
}
