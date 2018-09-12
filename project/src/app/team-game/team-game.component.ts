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
  active_index: number = null; //index of our games array that is currently in use by selectedGame
  gameForm: Game;
  errors: any = [];
  selectedGame: Game = null;
  players: Player[];

  constructor(private rosterService: RosterService) { }

  ngOnInit() {
    this.getAllGames();
    this.gameForm = new Game;
    // this.selectedGame = this.games[0];  //this generated an error, since this.games has not been populated yet.  Is it time for-*gasp*- a promise?!
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

    //set active_index for use in setPlayerStatus()
    this.active_index = this.games.findIndex(game => game._id === event.target.value);
    //don't trouble the server, it works hard enough.
    this.selectedGame = this.games.find(game => game._id === event.target.value);

    // this.rosterService.getGameById(event.target.value).subscribe((response)=>{
    //   if(response['message'] === 'error'){
    //     console.log("error on setGame in TeamGameComponent", response);
    //   } else {
    //     console.log("setting selectedGame...");
    //     this.selectedGame = response as Game;
    //   }
    // });
  }

  getAllGames(){
    this.rosterService.getAllGames().subscribe(games => this.games = games as Game[]);
  }

  setPlayerStatus(index: number, status_change: string){
    //don't bother the server if there is no change.
    if(status_change == this.selectedGame.player_status[index]['status']){
      return;
    }
    console.log("setting player status to", status_change, "at index", index);
    console.log(this.selectedGame.player_status[index]['status']);
    this.selectedGame.player_status[index]['status'] = status_change;
    this.games[this.active_index] = this.selectedGame;
    //okay... until I write something better, update the database on every setPlayerStatus() call...
    //first make it work.  then make it better.
    let id = this.selectedGame._id;
    this.rosterService.editGame(id, this.selectedGame).subscribe((response)=>{
      if(response['message'] === 'error'){
        console.log("error in TeamGameComponent.setPlayerStatus() update", response['message']);
      } else {
        console.log("selectedGame updated succesfully");
      }
    });

    //for 'selectedGame.player_status[index]', set selectedGame.player_status[index].status = status_change
    //update database.
    //update entry on this.games array.
    //Should we store changes, and update on page navigation or a change in selectedGame?  Would be more efficient.
    //update on a change in selectedGame would be pretty easy,
    //just call the update in setGame with the current value of selectedGame, then update selectedGame.
    //unsure how to do it on page navigation!
    //one way would be to store selectedGame in session, check for it on a routing call?  mebbe.
  }

  clearForm(){
    this.gameForm = new Game;
  }
}
