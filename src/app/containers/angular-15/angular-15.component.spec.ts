import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angular15Component } from './angular-15.component';

describe('Angular15Component', () => {
  let component: Angular15Component;
  let fixture: ComponentFixture<Angular15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angular15Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Angular15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
