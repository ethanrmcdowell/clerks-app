import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedsItemsComponent } from './deeds-items.component';

describe('DeedsItemsComponent', () => {
  let component: DeedsItemsComponent;
  let fixture: ComponentFixture<DeedsItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeedsItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeedsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
