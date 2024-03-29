import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, } from 'rxjs';
import { catchError, filter, first, map, skip, take } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';

  private firstOlympic: Olympic[] = [{id:0, country:"none", participations:[ {
    "id": 1,
    "year": 2012,
    "city": "Londres",
    "medalsCount": 28,
    "athleteCount": 372
  }]}];

  private olympics$ = new BehaviorSubject<Olympic[]>(this.firstOlympic);

  // This links BehaviorSubject, and Observable easier to use 
  olympic_obs$ = this.olympics$.asObservable();

  constructor(private http: HttpClient, 
    private errorService:ErrorService) {
  }

  //links JSON to subject. 
  loadInitialData() {
    this.olympic_obs$ =  this.http.get<Olympic[]>(this.olympicUrl).pipe(
      take(1), // added here. was outside function in app.component 
      catchError((error, caught) => {
        this.errorService.handleError(error);
        this.olympics$.next(this.firstOlympic);  // can be useful to end loading state and let the user know something went wrong
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
        })),
        catchError((error) => this.errorService.handleError(error)),
    )
  }

  totalMedalsCountry(my_country:string){
    let total = 0;
    return this.getOlympics().pipe(
        map(res => 
          res.filter((item: { country: string; }) => item.country === my_country),
        ),
        map(res => res.map((data: Olympic) => 
        {
          return this.getTotalMedals(data.participations);
        })),
        map(arr => arr[0]),
        catchError((error) => this.errorService.handleError(error)),
    )
  }

  //Get number of JOs participations, assuming countries have the same number of participations 
  getJOs(){
    return this.getOlympics().pipe(
      map((arr: Olympic[]) => arr[0]),
      map(new_res => new_res.participations.length),
      catchError((error) => this.errorService.handleError(error))
    )
  }

  //Intermediate function. Makes array with medal and year for a specific country 
  participationToLine(participation: Participation[]){
    let array:{value:number,name:number}[] = [];
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
        res.filter((item: { country: string; }) => item.country === my_country),
      ),
      map(arr => arr[0]),
      map(res => {
        return [{name:my_country, series:this.participationToLine(res.participations)}];
      }),
      catchError((error) => this.errorService.handleError(error))
    )
  }

  //Intermediate function. Get total athletes for one participation 
  getTotalAthletesPerCountry(participation: Participation[]){
    let total = 0;
    participation.forEach(element => {
      total += element.athleteCount;
    });
    return total;
  }

  //Get total athletes in participations for a specific country
  getTotalAthletes(my_country:string){
    return this.getOlympics().pipe(
      map(res => 
        res.filter((item: { country: string; }) => item.country === my_country),
      ),
      map(arr => arr[0]),
      map(res => {return this.getTotalAthletesPerCountry(res.participations)}),
      catchError((error) => this.errorService.handleError(error))
    )
  }

}
