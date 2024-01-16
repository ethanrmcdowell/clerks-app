import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsAddComponent } from './meetings-add.component';

describe('MeetingsAddComponent', () => {
  let component: MeetingsAddComponent;
  let fixture: ComponentFixture<MeetingsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
