/*
   I think I like splitting this component up, it feels bulky.
    Add: new game component, game display component
    Might have to break it up later.
*/

import { Component, OnInit } from '@angular/core';
import { RosterService } from '../roster.service';
import { Game } from '../game';
import { Player } from '../player';

@Component({
  selector: 'app-team-game',
  templateUrl: './team-game.component.html',
  styleUrls: ['./team-game.component.css']
})
export class TeamGameComponent implements OnInit {

  games: Game[];
  gameForm: Game;
  errors: any = [];
  selectedGame: Game = null;
  players: Player[];

  constructor(private rosterService: RosterService) { }

  ngOnInit() {
    this.getAllGames();
    this.gameForm = new Game;
  }

  /*
    updating player status:
      I'm thinking update the game object when selectedGame is updated, or
      the client navigates to a new page.  It would be *safer* to update every time
      a player status is changed.
  */

  newGame(){
    console.log("newGame method in TeamGameComponent, gameForm:", this.gameForm);
    this.rosterService.newGame(this.gameForm).subscribe((response)=>{
      if(response['message'] === 'error'){
        console.log("error in TeamGameComponent.newGame()", response['message']);
        this.errors = response['errors'];
      } else {
        console.log("success in TeamGameComponent.newGame()", response);
        this.games.push(response as Game);
        this.gameForm = new Game;
      }
    })
  }
  
  setGame(event){
    this.rosterService.getGameById(event.target.value).subscribe((response)=>{
      if(response['message'] === 'error'){
        console.log("error on setGame in TeamGameComponent", response);
      } else {
        console.log("setting selectedGame...");
        this.selectedGame = response as Game;
      }
    });
  }

  getAllGames(){
    this.rosterService.getAllGames().subscribe(games => this.games = games as Game[]);
  }

  clearForm(){
    this.gameForm = new Game;
  }
}
