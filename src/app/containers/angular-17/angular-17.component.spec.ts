import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular17Component } from './angular-17.component';

describe('Angular17Component', () => {
  let component: Angular17Component;
  let fixture: ComponentFixture<Angular17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angular17Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Angular17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
