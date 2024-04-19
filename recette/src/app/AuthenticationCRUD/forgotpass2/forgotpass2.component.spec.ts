import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgotpass2Component } from './forgotpass2.component';

describe('Forgotpass2Component', () => {
  let component: Forgotpass2Component;
  let fixture: ComponentFixture<Forgotpass2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Forgotpass2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forgotpass2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
