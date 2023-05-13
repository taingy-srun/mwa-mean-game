import { Component, OnInit, SimpleChange } from '@angular/core';
import { GamesDataService } from '../games-data.service';


export class Game {
  #_id!: string;
  #title!: string;
  #year!: number;
  #price!: number;
  #rate!: number;
  #minPlayers!: number;
  #maxPlayers!: number;
  #minAge!: number;

  get _id(): string {
    return this.#_id;
  }
  get title(): string {
    return this.#title;
  }
  set title(title: string) {
    this.#title = title;
  }
  get price(): number {
    return this.#price;
  }
  set price(price: number) {
    this.#price = price;
  }
  get year(): number {
    return this.#year;
  }
  set year(year: number) {
    this.#year = year;
  }
  get rate(): number {
    return this.#rate;
  }
  set rate(rate: number) {
    this.#rate = rate
  }
  get minPlayers(): number {
    return this.#minPlayers
  }
  set minPlayers(minPlayers: number) {
    this.#minPlayers = minPlayers;
  }
  get maxPlayers(): number {
    return this.#maxPlayers
  }
  set maxPlayers(maxPlayers: number) {
    this.#maxPlayers = maxPlayers;
  }
  get minAge(): number {
    return this.#minAge;
  }
  set minAge(minAge: number) {
    this.#minAge = minAge;
  }
}


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{

  games!: Game[];
  offset: number = 0;
  count: number = 5;

  constructor(private _gameService: GamesDataService) {}

  ngOnInit(): void {
    this.getGames();
  }

  private _delete(id: string) {
    this._gameService.deleteOne(id).subscribe({
      next: (game) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("On complete");
      }
    });
  }

  public delete(id: string) {
    this._delete(id);
  }

  private getGames() {
    this._gameService.getByPage(this.offset, this.count).subscribe({
      next: (games) => {
        this.games = games;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("On complete");
      }
    });
  }

  public getNextPage() {
    this.setNextPageValue();
    this.getGames();
  }

  public getPreviousPage() {
    this.setPreviousPageValue();
    this.getGames();
  }

  private setNextPageValue() {
    this.offset += this.count;
  }

  private setPreviousPageValue() {   
    if (this.offset > 0) {
      this.offset -= this.count;
    } else {
      this.offset = 0;
    }

    if (this.offset < 0) {
      this.offset = 0;
    }
  }

  public disablePreviousButton():boolean {
      return this.offset == 0;
  }

  public disableNextButton():boolean {
    if (!this.games) {
      return false;
    }
    return this.games.length < 5;
  }
}
