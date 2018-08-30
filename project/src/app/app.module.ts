import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { RosterService } from './roster.service';

import { AppComponent } from './app.component';
import { TeamRosterComponent } from './team-roster/team-roster.component';
import { TeamAddPlayerComponent } from './team-add-player/team-add-player.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TeamGameComponent } from './team-game/team-game.component';

@NgModule({
  declarations: [
    AppComponent,
    TeamRosterComponent,
    TeamAddPlayerComponent,
    NavbarComponent,
    TeamGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RosterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
