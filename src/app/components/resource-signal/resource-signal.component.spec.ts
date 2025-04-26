import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSignalComponent } from './resource-signal.component';

describe('ResourceSignalComponent', () => {
  let component: ResourceSignalComponent;
  let fixture: ComponentFixture<ResourceSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceSignalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
