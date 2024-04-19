import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedomaineComponent } from './updatedomaine.component';

describe('UpdatedomaineComponent', () => {
  let component: UpdatedomaineComponent;
  let fixture: ComponentFixture<UpdatedomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedomaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatedomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
