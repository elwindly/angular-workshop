import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular14Component } from './angular-14.component';

describe('Angular14Component', () => {
  let component: Angular14Component;
  let fixture: ComponentFixture<Angular14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angular14Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Angular14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
