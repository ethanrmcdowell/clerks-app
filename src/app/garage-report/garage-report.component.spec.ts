import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageReportComponent } from './garage-report.component';

describe('GarageReportComponent', () => {
  let component: GarageReportComponent;
  let fixture: ComponentFixture<GarageReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
