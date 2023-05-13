import { Component, OnInit } from '@angular/core';
import { Game } from '../games/games.component';
import { GamesDataService } from '../games-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  game: Game = new Game();

  constructor(private _gameService: GamesDataService, private _route: ActivatedRoute, private _router: Router) {}

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

  public delete() {
    this._gameService.deleteOne(this.game._id).subscribe({
      next: (game) => {
        this.goToGamesPage();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("On complete");
      }
    });
  }

  public update() {
    
  }

  public goToGamesPage() {
    this._router.navigate(["/games"]);
  }
}
