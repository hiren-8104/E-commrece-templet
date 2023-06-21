import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating:any
  @Input() isReviewFlag:any = false;
  @Output() rate= new EventEmitter<any>()
  constructor() { }


  ngOnInit(): void {
    // this.rating= this.rating.toFixed();

  }
  giveRating(startRate: any) {
   if(!this.rating && this.isReviewFlag) {
     this.rating =startRate
    }
    this.rate.emit(startRate);
  }


}
