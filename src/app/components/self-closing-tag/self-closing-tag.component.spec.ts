import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfClosingTagComponent } from './self-closing-tag.component';

describe('SelfClosingTagComponent', () => {
  let component: SelfClosingTagComponent;
  let fixture: ComponentFixture<SelfClosingTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelfClosingTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfClosingTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
