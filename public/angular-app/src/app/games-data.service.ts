import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from './games/games.component';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  _baseUrl:string = "http://localhost:4000/api/games";
  constructor(private _http: HttpClient) {}

  public getAll(): Observable<Game[]> {
    return this._http.get<Game[]>(this._baseUrl);
  }

  public getOne(_id: string): Observable<Game> {
    return this._http.get<Game>(this._baseUrl + "/" + _id);
  }
}
