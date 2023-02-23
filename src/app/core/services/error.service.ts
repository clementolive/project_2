import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/** This basic Error function displays error for developer and return an Observable 
 * so the data flow is not interrupted.
 */
export class ErrorService {
  handleError(error: any) {
    console.error(error);
    return of([]);
  }

  constructor() { }
}
