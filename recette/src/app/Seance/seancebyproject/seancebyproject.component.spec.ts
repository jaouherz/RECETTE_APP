import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancebyprojectComponent } from './seancebyproject.component';

describe('SeancebyprojectComponent', () => {
  let component: SeancebyprojectComponent;
  let fixture: ComponentFixture<SeancebyprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeancebyprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeancebyprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
