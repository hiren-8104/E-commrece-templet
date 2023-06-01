import { Component, Input, OnInit } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
@Input()rating:any = 4.5
  constructor() { }


  ngOnInit(): void {
  
  
  }


}
