import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private requestCount: number = 0;
  private spinnerSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  spinner$ = this.spinnerSubject.asObservable();

  showSpinner(): void {
    this.requestCount++;
    this.spinnerSubject.next(true);
  }

  hideSpinner(): void {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      this.spinnerSubject.next(false);
    }
  }
}
