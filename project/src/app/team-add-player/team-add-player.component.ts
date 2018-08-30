import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
  make sure they're up-to-date.  We'll want to pull a list of
  all games and place them on the player's status.  Eventually do
  the same for drills.  Worth noting we could do this on
  the server instead.*/
  newPlayer(){
    this.player.status
    this.rosterService.newPlayer(this.player).subscribe((response)=>{
      console.log(response);
      if(response['message'] === 'error'){
        this.errors = response['errors'];
      } else {
        //update status w/ loop here.  oh.  that takes another hit on the server.  we're doing it on the server.
        this.refresh.emit(response as Player);
        this.player = new Player;
      }
    })
  }

  clearForm(){
    this.player = new Player;
  }

}
