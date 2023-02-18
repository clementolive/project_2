import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  country!: string | null;
  constructor( private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.params['country'];
    console.log(this.country);
  }

}
