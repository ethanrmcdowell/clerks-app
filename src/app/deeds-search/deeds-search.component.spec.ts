import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedsSearchComponent } from './deeds-search.component';

describe('DeedsSearchComponent', () => {
  let component: DeedsSearchComponent;
  let fixture: ComponentFixture<DeedsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeedsSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeedsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
