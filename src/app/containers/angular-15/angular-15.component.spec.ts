import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMAGE_CONFIG, NgOptimizedImage } from '@angular/common';
import { Angular15Component } from './angular-15.component';

describe('Angular15Component', () => {
  let component: Angular15Component;
  let fixture: ComponentFixture<Angular15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angular15Component, NgOptimizedImage],
      providers: [
        {
          provide: IMAGE_CONFIG,
          useValue: {
            placeholderResolution: 40,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Angular15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
