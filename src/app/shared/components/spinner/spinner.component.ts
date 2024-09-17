import { Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  private readonly spinnerService = inject(SpinnerService);
  isLoading$ = this.spinnerService.spinner$;
}
