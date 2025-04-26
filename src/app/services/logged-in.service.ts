import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedInService {
  private loggedIn = true;

  setLoggedIn(status: boolean) {
    this.loggedIn = status;
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.loggedIn);
  }
}
