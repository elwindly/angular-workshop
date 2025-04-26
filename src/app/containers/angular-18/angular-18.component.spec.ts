import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular18Component } from './angular-18.component';

describe('Angular18Component', () => {
  let component: Angular18Component;
  let fixture: ComponentFixture<Angular18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angular18Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Angular18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
