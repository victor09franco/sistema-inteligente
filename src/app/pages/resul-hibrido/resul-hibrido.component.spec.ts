import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResulHibridoComponent } from './resul-hibrido.component';

describe('ResulHibridoComponent', () => {
  let component: ResulHibridoComponent;
  let fixture: ComponentFixture<ResulHibridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResulHibridoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResulHibridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
