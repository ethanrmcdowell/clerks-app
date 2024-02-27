import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedsAddComponent } from './deeds-add.component';

describe('DeedsAddComponent', () => {
  let component: DeedsAddComponent;
  let fixture: ComponentFixture<DeedsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeedsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeedsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
