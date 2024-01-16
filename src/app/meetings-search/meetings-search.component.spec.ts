import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsSearchComponent } from './meetings-search.component';

describe('MeetingsSearchComponent', () => {
  let component: MeetingsSearchComponent;
  let fixture: ComponentFixture<MeetingsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingsSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
