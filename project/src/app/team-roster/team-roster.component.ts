import { Component, OnInit } from '@angular/core';
import { RosterService } from '../roster.service';
import { Player } from './../player';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.css']
})
export class TeamRosterComponent implements OnInit {

  players: Player[]; //obviously we will change this once we have our modelling set.

  constructor(private rosterService: RosterService) { }

  ngOnInit() {
    this.getAll();
  }

  deletePlayer(id: String){
    console.log("TeamRosterComponent: deletePlayer()", id);
    this.rosterService.removePlayer(id);
  }

  getAll(){
    console.log("getAll in TeamRosterComponent");
    this.rosterService.getAllPlayers().subscribe(players => this.players = players as Player[]);
  }

  appendPlayer(event){
    console.log(event);
    this.players.push(event);
  }

}
