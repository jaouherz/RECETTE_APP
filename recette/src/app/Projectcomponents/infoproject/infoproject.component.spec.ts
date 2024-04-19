import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoprojectComponent } from './infoproject.component';

describe('InfoprojectComponent', () => {
  let component: InfoprojectComponent;
  let fixture: ComponentFixture<InfoprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
