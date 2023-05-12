import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.css']
})
export class RatingStarComponent {

  @Input()
  rating!: number;

  ratedStars!: number[];
  unRatedStars!: number[];

  maxRating = 5;

  ngOnChanges(changes: SimpleChange) {
    this.ratedStars = new Array<number>(this.rating);
    this.unRatedStars = new Array<number>(this.maxRating - this.rating);
  }
}
