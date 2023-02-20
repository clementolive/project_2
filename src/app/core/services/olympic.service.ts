import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(null);
  olympic_obs$ = this.olympics$.asObservable();

  constructor(private http: HttpClient) {
    this.olympic_obs$ = this.init();
  }

  init(){
    return this.http.get<Olympic[]>(this.olympicUrl);
   }

  //links JSON to subject. 
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      //tap((value) => this.olympics$.next(value)),
      tap(res => console.log("initialData", res)),

      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  //Intermediate function. 
  getTotalMedals(participation: Participation[]){
    let total = 0;
    participation.forEach(element => {
      total += element.medalsCount;
    });
    return total;
  }

  // Convert Observable data for ngx Piechart 
  toPie(){
    let total = 0;
    return this.olympic_obs$.pipe(
      map(res => res.map((data: { participations: Participation[]; country: any; }) => {
        {
          total = this.getTotalMedals(data.participations);
          return {name:data.country, value:total}
        };
      })
      ),
      tap(res => console.log("toPie:", res))
    )
  }

}
