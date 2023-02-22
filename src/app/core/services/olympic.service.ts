import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
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

  //Intermediate function. Counts medals for all participations of an array. 
  getTotalMedals(participation: Participation[]){
    let total = 0;
    participation.forEach(element => {
      total += element.medalsCount;
    });
    return total;
  }

  //Format Observable data for ngx Piechart 
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
    )
  }

  //Total medals per country array ==> total medals from a specific country 
  totalMedalsCountry(my_country:string){
    return this.toPie().pipe(
      map(res => 
        res.find((element: { name: string; }) => element.name === my_country),
      ), 
      map(res => {
        return res.value;
      }),
    )
  }

  //Get number of JOs participations 
  getJOs(){
    return this.getOlympics().pipe(
      map((arr: any[]) => arr[0]),
      map(new_res => new_res.participations.length),
    )
  }

  //Intermediate function. Makes array with medal and year for a specific country 
  participationToLine(participation: Participation[]){
    let array:any[] = [];
    participation.forEach(element => {
      array.push({value:element.medalsCount, name:element.year});
    });
    return array;
}

  //Format olympic data to use in a NGX line chart
  //1. Get the element related to a specific country 
  //2. Format a new array, getting medals and years
  //3. Format into line chart (name, series)
  //Line chart format: medals per edition (for one country)
  // [
  //   {
  //     "name": "Italy",
  //     "series": [
  //       {
  //         "value": 4271,
  //         "name": "2016-09-23T05:09:43.973Z"
  //       },
  //     ]
  //   },
  // ]
  toLine(my_country:string){
    return this.getOlympics().pipe(
      map(res => 
         res.find((element: { country: string; }) => element.country === my_country),
      ),
      map(res => {
        return [{name:my_country, series:this.participationToLine(res.participations)}];
      }),
    )
  }

  //Intermediate function
  getTotalAthletesPerCountry(participation: Participation[]){
    let total = 0;
    participation.forEach(element => {
      total += element.athleteCount;
    });
    return total;
  }

  getTotalAthletes(my_country:string){
    return this.getOlympics().pipe(
      map(res => 
          res.find((element: { country: string; }) => element.country === my_country),
      ),
      map(res => {return this.getTotalAthletesPerCountry(res.participations)}),
    )
  }

}
