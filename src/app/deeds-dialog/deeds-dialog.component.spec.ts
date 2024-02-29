import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeedsDialogComponent } from './deeds-dialog.component';

describe('DeedsDialogComponent', () => {
  let component: DeedsDialogComponent;
  let fixture: ComponentFixture<DeedsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeedsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeedsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
