import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  handleError(error: any) {
    console.error(error);
    return of([]);
  }

  constructor() { }
}
