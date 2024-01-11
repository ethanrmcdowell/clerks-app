import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageItemsComponent } from './garage-items.component';

describe('GarageItemsComponent', () => {
  let component: GarageItemsComponent;
  let fixture: ComponentFixture<GarageItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarageItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
