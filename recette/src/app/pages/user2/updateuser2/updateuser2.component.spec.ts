import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateuser2Component } from './updateuser2.component';

describe('Updateuser2Component', () => {
  let component: Updateuser2Component;
  let fixture: ComponentFixture<Updateuser2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Updateuser2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Updateuser2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
