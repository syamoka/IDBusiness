import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'IDBusiness';

  private readonly translationService = inject(TranslateService);
  private readonly languageService = inject(LanguageService);

  ngOnInit(): void {
    this.translationService.use(this.languageService.selectedLanguage);
  }
}
