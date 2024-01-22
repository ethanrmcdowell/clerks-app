import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingsItemsComponent } from './meetings-items.component';

describe('MeetingsItemsComponent', () => {
  let component: MeetingsItemsComponent;
  let fixture: ComponentFixture<MeetingsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeetingsItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetingsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
