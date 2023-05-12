import { Component, OnInit } from '@angular/core';
import { Game } from '../games/games.component';
import { GamesDataService } from '../games-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game: Game = new Game();

  constructor(private _gameService: GamesDataService, private _route: ActivatedRoute) {}

  ngOnInit(): void {
    const _id = this._route.snapshot.params["id"];
    this._gameService.getOne(_id).subscribe({
        next: (game) => {
          this.game = game;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("On complete");
        }
    });
  }

  public delete(_id: string) {
    this._gameService.deleteOne(_id).subscribe({
      next: (game) => {
        this.game = game;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("On complete");
      }
    });
  }

  public update(_id: string) {
    
  }
}
