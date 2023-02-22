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
  total_medals$!: Observable<number>;
  total_athletes$!: Observable<any>; 

  xAxisLabel = "years";
  yAxisLabel="medals";

  constructor( private activatedRoute:ActivatedRoute, 
    private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.params['country'];
    console.log(this.country);

 

    this.numberJOs$ = this.olympicService.getJOs();
    this.line_data$ = this.olympicService.toLine(this.country);
    this.total_medals$ = this.olympicService.totalMedalsCountry(this.country);

    this.total_athletes$ = this.olympicService.getTotalAthletes(this.country);
    //this.total_athletes$.subscribe();
  }

}
