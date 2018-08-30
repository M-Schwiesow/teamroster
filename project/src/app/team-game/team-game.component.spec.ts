import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamGameComponent } from './team-game.component';

describe('TeamGameComponent', () => {
  let component: TeamGameComponent;
  let fixture: ComponentFixture<TeamGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
