import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XgboostComponent } from './xgboost.component';

describe('XgboostComponent', () => {
  let component: XgboostComponent;
  let fixture: ComponentFixture<XgboostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XgboostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XgboostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
