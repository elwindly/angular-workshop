import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalDragAndDropComponent } from './horizontal-drag-and-drop.component';

describe('HorizontalDragAndDropComponent', () => {
  let component: HorizontalDragAndDropComponent;
  let fixture: ComponentFixture<HorizontalDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalDragAndDropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
