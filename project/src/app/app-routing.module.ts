import { NavbarComponent } from './navbar/navbar.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';
import { TeamGameComponent } from './team-game/team-game.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: TeamRosterComponent },
  {path: 'players', component: TeamRosterComponent},
  {path: 'games/:id', component: TeamGameComponent},
  {path: 'games', component: TeamGameComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }