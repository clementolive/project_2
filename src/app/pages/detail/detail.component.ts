import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  country!: string;
  numberJOs$!: Observable<number>;
  line_data$!: Observable<any>;
  constructor( private activatedRoute:ActivatedRoute, 
    private olympicService: OlympicService) { }

  //medals per edition (for one country)
  viewParams = [1000,500];
  testData = [
    {
      "name": "green",
      "series": [
        {
          "name": "Aug",
          "value": 14
        },
        {
          "name": "Sep",
          "value": 35
        },
        {
          "name": "Oct",
          "value": 4
        },
        {
          "name": "Nov",
          "value": 17
        },
        {
          "name": "Dec",
          "value": 14
        },
        {
          "name": "Jan",
          "value": 35
        }
      ]
    },
  
    {
      "name": "yellow",
      "series": [
        {
          "name": "Aug",
          "value": 364
        },
        {
          "name": "Sep",
          "value": 412
        },
        {
          "name": "Oct",
          "value": 437
        },
        {
          "name": "Nov",
          "value": 437
        },
        {
          "name": "Dec",
          "value": 364
        },
        {
          "name": "Jan",
          "value": 412
        }
      ]
    },
    {
      "name": "red",
      "series": [
        {
          "name": "Aug",
          "value": 168
        },
        {
          "name": "Sep",
          "value": 343
        },
        {
          "name": "Oct",
          "value": 512
        },
        {
          "name": "Nov",
          "value": 291
        },
        {
          "name": "Dec",
          "value": 168
        },
        {
          "name": "Jan",
          "value": 343
        },
      ]
    }
  ];

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.params['country'];
    console.log(this.country);

    this.numberJOs$ = this.olympicService.getJOs();
    this.line_data$ = this.olympicService.toLine(this.country);
    this.line_data$.subscribe();
    //this.olympicService.toLine();
  }

}
