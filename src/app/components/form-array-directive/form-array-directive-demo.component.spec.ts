import { TestBed } from '@angular/core/testing';
import { FormArrayDirectiveDemoComponent } from './form-array-directive-demo.component';

describe('FormArrayDirectiveDemoComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormArrayDirectiveDemoComponent],
    });
  });

  it('should create and add/remove items', () => {
    const fixture = TestBed.createComponent(FormArrayDirectiveDemoComponent);
    const component = fixture.componentInstance;

    // Initially empty
    expect(component.items.length).toBe(0);

    component.addItem();
    component.addItem();
    expect(component.items.length).toBe(2);

    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll('input');
    expect(inputs.length).toBe(2);

    component.removeItem(0);
    expect(component.items.length).toBe(1);
  });
});
