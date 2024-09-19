import { Component, ElementRef, inject } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { BankService } from '../services/bank/bank.service';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IBankAccount } from './models/bank-acount.interface';
import { SearchComponent } from '../components/search/search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, TranslateModule, AsyncPipe, SearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly bankService = inject(BankService);
  public readonly result$: Observable<{
    bankAccounts: IBankAccount[];
    transactions: any[];
    additionalData: { description: string };
  }> = this.bankService.fetchAllData();

  public changeInputType(inputRef: HTMLInputElement) {
    inputRef.type = inputRef.type === 'password' ? 'text' : 'password';
  }
}
