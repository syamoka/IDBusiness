import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { BankService } from '../services/bank/bank.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, TranslateModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly bankService = inject(BankService);
  constructor() {
    this.bankService.getBankAccounts().subscribe((res) => {
      console.log(res);
    });

    this.bankService.getTransactions().subscribe((res) => {
      console.log(res);
    });
    this.bankService.getAdditionalData().subscribe((res) => {
      console.log(res);
    });
  }
}
