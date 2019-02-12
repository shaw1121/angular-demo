import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterChildComponent } from './voter-child.component';

describe('VoterChildComponent', () => {
  let component: VoterChildComponent;
  let fixture: ComponentFixture<VoterChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
