import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaineComponent } from './domaine.component';

describe('DomaineComponent', () => {
  let component: DomaineComponent;
  let fixture: ComponentFixture<DomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
