import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular20Component } from './angular-20.component';

describe('Angular20Component', () => {
  let component: Angular20Component;
  let fixture: ComponentFixture<Angular20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angular20Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Angular20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
