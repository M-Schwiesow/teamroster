import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RosterService } from '../roster.service';
import { Player } from '../player';

@Component({
  selector: 'app-team-add-player',
  templateUrl: './team-add-player.component.html',
  styleUrls: ['./team-add-player.component.css']
})
export class TeamAddPlayerComponent implements OnInit {

  player: Player;
  errors: any = [];
  @Output() refresh = new EventEmitter();

  constructor(private rosterService: RosterService) { }

  ngOnInit() {
    this.player = new Player;
  }

  /*So, concerns.  When a player is created we want to
  make sure they're up-to-date.
  Altered the process, check notes for new player process.*/
  newPlayer(){
    this.rosterService.newPlayer(this.player).subscribe((response)=>{
      console.log(response);
      if(response['message'] === 'error'){
        this.errors = response['errors'];
      } else {
        //send the new player to parent to be appended to player list, clear form
        this.refresh.emit(response as Player);
        this.player = new Player;
      }
    })
  }

  clearForm(){
    this.player = new Player;
  }

}
