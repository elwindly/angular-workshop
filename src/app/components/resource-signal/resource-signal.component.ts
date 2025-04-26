import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DessertService } from '../../services/dessert.service';

@Component({
  selector: 'app-resource-signal',
  imports: [
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './resource-signal.component.html',
  styleUrl: './resource-signal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceSignalComponent {
  #dessertService = inject(DessertService);

  originalName = signal('');
  englishName = signal('');

  // Combine criteria to computed Signal
  dessertsCriteria = computed(() => ({
    originalName: this.originalName(),
    englishName: this.englishName(),
  }));

  // Define resource with request (=search criteria) and loader
  // Every time, the request (criteria) is changing, the loader is triggered
  dessertsResource = resource({
    request: this.dessertsCriteria,
    loader: (param) => {
      return this.#dessertService.findPromise(param.request, param.abortSignal);
    },
  });

  // initially, resources are undefined
  desserts = computed(() => this.dessertsResource.value() ?? []);

  loading = this.dessertsResource.isLoading;
  error = this.dessertsResource.error;

  reloadDesserts(): void {
    this.dessertsResource.reload();
  }
}
