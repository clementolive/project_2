import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LineChartData } from 'src/app/core/models/LineChartData';
import { LineChartParticipation } from 'src/app/core/models/LineChartParticipation';
import { OlympicService } from 'src/app/core/services/olympic.service';

/*
On this page, we get observables as variables from the olympic Service. 
Then, we subscribe to these with "async" in the HTML for an automatic unsubscribe handling. 
First the country chosen is obtained by URL parameter, then we can call observables based on the country. 
*/

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {
  country!: string;
  numberJOs$!: Observable<number>;
  line_data$!: Observable<LineChartData>;
  total_medals$!: Observable<number>;
  total_athletes$!: Observable<number>; 

  xAxisLabel = "years";
  yAxisLabel = "medals";

  constructor( private activatedRoute:ActivatedRoute, 
    private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.params['country'];
    this.numberJOs$ = this.olympicService.getJOs();
    this.line_data$ = this.olympicService.toLine(this.country);
    this.total_medals$ = this.olympicService.totalMedalsCountry(this.country);
    this.total_athletes$ = this.olympicService.getTotalAthletes(this.country);
  }

}
