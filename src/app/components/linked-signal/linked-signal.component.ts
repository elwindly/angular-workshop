import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  linkedSignal,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

interface ShippingMethod {
  id: number;
  name: string;
}

@Component({
  selector: 'app-linked-signal',
  imports: [MatButtonModule, JsonPipe],
  templateUrl: './linked-signal.component.html',
  styleUrl: './linked-signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkedSignalComponent {
  // constructor() {
  //   this.changeShipping(2);
  //   this.changeShippingOptions();
  //   console.log(this.selectedOption()); // {"id":2,"name":"Postal Service"}
  // }

  shippingOptions = signal<ShippingMethod[]>([
    { id: 0, name: 'Ground' },
    { id: 1, name: 'Sea' },
    { id: 2, name: 'Air' },
  ]);

  shippingOptionsLength = computed(() => {
    return this.shippingOptions().length;
  });

  selectedOption = linkedSignal<ShippingMethod[], ShippingMethod>({
    // `selectedOption` is set to the `computation` result whenever this `source` changes.
    source: this.shippingOptions,
    computation: (newOptions, previous) => {
      // If the newOptions contain the previously selected option, preserve that selection.
      // Otherwise, default to the first option.
      return (
        newOptions.find((opt) => opt.id === previous?.value.id) ?? newOptions[0]
      );
    },
  });

  changeShipping(index: number) {
    this.selectedOption.set(this.shippingOptions()[index]);
  }

  changeShippingOptions() {
    this.shippingOptions.set([
      { id: 0, name: 'Email' },
      { id: 1, name: 'Sea' },
      { id: 2, name: 'Postal Service' },
      { id: 3, name: 'Train' },
    ]);
  }
}
