import { Component, OnInit } from '@angular/core';
import { RosterService } from '../roster.service';
import { Player } from '../player';

@Component({
  selector: 'app-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.css']
})
export class TeamRosterComponent implements OnInit {

  players: Player[]; 
  
  constructor(private rosterService: RosterService) { }

  ngOnInit() {
    this.getAll();
  }
  //see notes for delete player process
  deletePlayer(id: String){
    console.log("TeamRosterComponent: deletePlayer()", id);
    let obs = this.rosterService.removePlayer(id);
    obs.subscribe(data =>{
      console.log("response in deletePlayer", data.toString);
      this.getAll();
    })
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
