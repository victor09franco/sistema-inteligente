import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandonForestComponent } from './randon-forest.component';

describe('RandonForestComponent', () => {
  let component: RandonForestComponent;
  let fixture: ComponentFixture<RandonForestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandonForestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandonForestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
