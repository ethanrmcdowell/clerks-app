import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageDialogComponent } from './garage-dialog.component';

describe('GarageDialogComponent', () => {
  let component: GarageDialogComponent;
  let fixture: ComponentFixture<GarageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
