import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageSearchComponent } from './garage-search.component';

describe('GarageSearchComponent', () => {
  let component: GarageSearchComponent;
  let fixture: ComponentFixture<GarageSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
