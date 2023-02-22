import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, concatAll, count, distinct, filter, find, first, map, take, tap } from 'rxjs/operators';
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
  }

  //links JSON to subject. 
  loadInitialData() {
    this.olympic_obs$ =  this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap(res => console.log("Load initial Data", res)),
      take(1), // added here. was outside function in app.component 
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
    return this.olympic_obs$;
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
    return this.getOlympics().pipe(
      map(res => res.map((data: Olympic) => 
        {
          total = this.getTotalMedals(data.participations);
          return {name:data.country, value:total};
        }
      )
      ),
     // tap(res => console.log("toPie:", res))
    )
  }

  //Get number of JOs participations 
  getJOs(){
    return this.getOlympics().pipe(
      map((arr: any[]) => arr[0]),
      map(new_res => new_res.participations.length),
      //tap(res => console.log("getNumberJOs:", res)),
    )
  }

  //medals per edition (for one country)
  // [
  //   {
  //     "name": "Italy",
  //     "series": [
  //       {
  //         "value": 4271,
  //         "name": "2016-09-23T05:09:43.973Z"
  //       },
  //       {
  //         "value": 5428,
  //         "name": "2016-09-22T21:29:28.193Z"
  //       },
  //     ]
  //   },
  toLine(){
    return this.getOlympics().pipe(
      //tap(res => console.log("TEST: ", res)),
    )
  }

  medalsPerCountry(my_country:string){
    return this.getOlympics().pipe(
      tap((res:Olympic) => console.log("LINE data 1 : ", res)),
      filter((data: Olympic) =>  data.country === my_country),
      tap(res => console.log("LINE data 2: ", res)),
      // map(res => res.participations),
      // tap(res => console.log("LINE data 3: ", res)),
      // map(res => {
      //   return {value: res.medalsCount, name: res.year};
      // }),
      
  )
}

}
