import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title!: string;
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.title = "olympic-games-starter";
    this.olympicService.loadInitialData();
  }

  
}
