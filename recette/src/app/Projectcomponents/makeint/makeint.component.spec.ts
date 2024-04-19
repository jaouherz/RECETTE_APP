import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeintComponent } from './makeint.component';

describe('MakeintComponent', () => {
  let component: MakeintComponent;
  let fixture: ComponentFixture<MakeintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
