import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedomaineComponent } from './listedomaine.component';

describe('ListedomaineComponent', () => {
  let component: ListedomaineComponent;
  let fixture: ComponentFixture<ListedomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedomaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
