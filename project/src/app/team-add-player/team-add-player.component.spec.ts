import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddPlayerComponent } from './team-add-player.component';

describe('TeamAddPlayerComponent', () => {
  let component: TeamAddPlayerComponent;
  let fixture: ComponentFixture<TeamAddPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamAddPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamAddPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
