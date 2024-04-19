import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listeuser2Component } from './listeuser2.component';

describe('Listeuser2Component', () => {
  let component: Listeuser2Component;
  let fixture: ComponentFixture<Listeuser2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Listeuser2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listeuser2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
