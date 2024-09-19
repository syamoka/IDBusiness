import { Component, ElementRef, inject } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { BankService } from '../services/bank/bank.service';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IBankAccount } from './models/bank-acount.interface';
import { SearchComponent } from '../components/search/search.component';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    TranslateModule,
    AsyncPipe,
    SearchComponent,
    TitleCasePipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly bankService = inject(BankService);
  private readonly breadcrumbService = inject(BreadcrumbService);
  public readonly result$: Observable<{
    bankAccounts: IBankAccount[];
    transactions: any[];
    additionalData: { description: string };
  }> = this.bankService.fetchAllData();
  public breadcrumbs = this.breadcrumbService.getBreadcrumbTrail();

  public changeInputType(inputRef: HTMLInputElement) {
    inputRef.type = inputRef.type === 'password' ? 'text' : 'password';
  }
}
