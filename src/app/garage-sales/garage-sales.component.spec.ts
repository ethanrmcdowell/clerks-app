import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageSalesComponent } from './garage-sales.component';

describe('GarageSalesComponent', () => {
  let component: GarageSalesComponent;
  let fixture: ComponentFixture<GarageSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GarageSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
