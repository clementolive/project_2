import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { first, map, take, tap } from 'rxjs/operators';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  pie_data$!: Observable<Olympic[]>;
  numberJOs$!:Observable<number>;

  constructor(private olympicService: OlympicService, 
    private router:Router) {}

  ngOnInit(): void {
    this.olympicService.loadInitialData();
    this.pie_data$ = this.olympicService.toPie();
    this.numberJOs$ = this.olympicService.getJOs();
  }

  //hover 
  onActivate(){

  }

  //click on element 
  onSelect($event: any){
    this.router.navigateByUrl("detail/" + $event.name);
  }

}
