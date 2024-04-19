import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeancelisteComponent } from './seanceliste.component';

describe('SeancelisteComponent', () => {
  let component: SeancelisteComponent;
  let fixture: ComponentFixture<SeancelisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeancelisteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeancelisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
