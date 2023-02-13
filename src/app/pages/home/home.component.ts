import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

type PieMedals = {
  name: string,
  value:number,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<any>;

  data = [
    {
      "id": 1,
      "country": "Italy",
      "participations": [
        {
          "id": 1,
          "year": 2012,
          "city": "Londres",
          "medalsCount": 28,
          "athleteCount": 372
        },
        {
          "id": 2,
          "year": 2016,
          "city": "Rio de Janeiro",
          "medalsCount": 28,
          "athleteCount": 375
        },
        {
          "id": 3,
          "year": 2020,
          "city": "Tokyo",
          "medalsCount": 40,
          "athleteCount": 381
        }
      ]
    },
    {
      "id": 2,
      "country": "Spain",
      "participations": [
        {
          "id": 1,
          "year": 2012,
          "city": "Londres",
          "medalsCount": 20,
          "athleteCount": 315
        },
        {
          "id": 2,
          "year": 2016,
          "city": "Rio de Janeiro",
          "medalsCount": 17,
          "athleteCount": 312
        },
        {
          "id": 3,
          "year": 2020,
          "city": "Tokyo",
          "medalsCount": 17,
          "athleteCount": 321
        }
      ]
    },
    {
      "id": 3,
      "country": "United States",
      "participations": [
        {
          "id": 1,
          "year": 2012,
          "city": "Londres",
          "medalsCount": 109,
          "athleteCount": 610
        },
        {
          "id": 2,
          "year": 2016,
          "city": "Rio de Janeiro",
          "medalsCount": 123,
          "athleteCount": 652
        },
        {
          "id": 3,
          "year": 2020,
          "city": "Tokyo",
          "medalsCount": 113,
          "athleteCount": 626
        }
      ]
    },
    {
      "id": 4,
      "country": "Germany",
      "participations": [
        {
          "id": 1,
          "year": 2012,
          "city": "Londres",
          "medalsCount": 44,
          "athleteCount": 425
        },
        {
          "id": 2,
          "year": 2016,
          "city": "Rio de Janeiro",
          "medalsCount": 44,
          "athleteCount": 422
        },
        {
          "id": 3,
          "year": 2020,
          "city": "Tokyo",
          "medalsCount": 37,
          "athleteCount": 425
        }
      ]
    },
    {
      "id": 5,
      "country": "France",
      "participations": [
        {
          "id": 1,
          "year": 2012,
          "city": "Londres",
          "medalsCount": 35,
          "athleteCount": 423
        },
        {
          "id": 2,
          "year": 2016,
          "city": "Rio de Janeiro",
          "medalsCount": 45,
          "athleteCount": 412
        },
        {
          "id": 3,
          "year": 2020,
          "city": "Tokyo",
          "medalsCount": 33,
          "athleteCount": 403
        }
      ]
    }
  ];  

  //for testing only 
  testData = [];
  countries!: number;

  constructor(private olympicService: OlympicService, 
    private router:Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    console.log(this.olympics$);
    console.log(this.testData = this.getMedalsPerCountry());
   //console.log(this.testData = this.getMedalsFromObs());
  }


  getMedalsPerCountry(){
    let array:any = [];
    this.data.forEach(element => {
      let name = element.country;
      let value = 0;
      element.participations.forEach(element => {
       value += element.medalsCount;
      });
      array.push({name,value});
    
    });
    return array ;
  }

  getMedalsFromObs(){
    let array:any = [];
    this.olympics$.forEach(element => {
      let name = element.country;
      let value = 0;
      element.participations.forEach((element: { medalsCount: number; }) => {
       value += element.medalsCount;
      });
      array.push({name,value});
    
    });
    return array ;
  }

  //hover 
  onActivate(){

  }

  //click on element 
  onSelect(){
    this.router.navigate(['detail']);
  }

}
