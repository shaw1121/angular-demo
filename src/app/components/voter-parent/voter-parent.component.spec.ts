import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterParentComponent } from './voter-parent.component';

describe('VoterParentComponent', () => {
  let component: VoterParentComponent;
  let fixture: ComponentFixture<VoterParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
