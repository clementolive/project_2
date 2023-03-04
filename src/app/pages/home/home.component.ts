import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { PieChartElement } from 'src/app/core/models/PieChartElement';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  pie_data$!: Observable<PieChartElement[]>;
  numberJOs$!:Observable<number>;

  constructor(private olympicService: OlympicService, 
    private router:Router) {}

  ngOnInit(): void {
    this.pie_data$ = this.olympicService.toPie();
    this.numberJOs$ = this.olympicService.getJOs();
  }

  //click on element 
  onSelect($event: { name: string; }){
    this.router.navigateByUrl("detail/" + $event.name);
  }


}
