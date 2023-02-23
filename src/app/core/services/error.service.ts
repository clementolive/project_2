import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/** This basic Error function displays error for developer
 */
export class ErrorService {
  handleError(error: any) {
    console.error("General error:", error);
    return throwError(() => new Error('General error'));
  }

  constructor() { }
}
