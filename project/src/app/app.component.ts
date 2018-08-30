import { Component } from '@angular/core';
import { RosterService } from './roster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Team Roster';
  constructor(private rosterService : RosterService){}
}
