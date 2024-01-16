import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageAddComponent } from './garage-add.component';

describe('GarageAddComponent', () => {
  let component: GarageAddComponent;
  let fixture: ComponentFixture<GarageAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
