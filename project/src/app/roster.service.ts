import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  constructor(private _http: HttpClient) { }

  getAllPlayers(){
    return this._http.get('/roster');
  }

  //future use, display drill times, perhaps status by game?
  getPlayerById(id: String){
    return this._http.get(`/roster/${id}`);
  }

  newPlayer(data){
    console.log("RosterService.newPlayer data:", data);
    return this._http.post('/roster', data);
  }

  editPlayer(id: String, data){
    return this._http.put(`/roster/${id}`, data);
  }

  removePlayer(id: String){
    console.log(`RosterService removePlayer(), ${id}`);
    return this._http.delete(`/roster/${id}`);
  }


  //game methods
  getAllGames(){
    return this._http.get('/game');
  }

  getGameById(id: String){
    return this._http.get(`/game/${id}`);
  }

  newGame(data){
    console.log("RosterService.newGame data:", data);
    return this._http.post('/game', data);
  }

  removeGame(id: String){
    return this._http.delete(`/game/${id}`);
  }
}
