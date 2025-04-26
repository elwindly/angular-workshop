import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { toPromise } from '../utils/to-promise';
const dataFile = './desserts.json';

export interface Dessert {
  id: number;
  originalName: string;
  englishName: string;
  description: string;
  kcal: number;
  rating: number;
  image: string;
}

export interface DessertFilter {
  englishName: string;
  originalName: string;
}

// https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal
// https://www.angulararchitects.io/en/blog/asynchronous-resources-with-angulars-new-resource-api/

@Injectable({ providedIn: 'root' })
export class DessertService {
  #http = inject(HttpClient);

  find(filter: DessertFilter): Observable<Dessert[]> {
    return this.#http.get<Dessert[]>(dataFile).pipe(
      delay(1000), // Simulate network delay
      map((result: Dessert[]) =>
        result.filter(
          (d: Dessert) =>
            d.originalName
              .toLowerCase()
              .includes(filter.originalName.toLowerCase()) &&
            d.englishName
              .toLowerCase()
              .includes(filter.englishName.toLowerCase())
        )
      )
    );
  }

  findPromise(
    filter: DessertFilter,
    abortSignal: AbortSignal
  ): Promise<Dessert[]> {
    return toPromise(this.find(filter), abortSignal);
  }

  findById(id: number): Observable<Dessert | undefined> {
    return this.#http
      .get<Dessert[]>(dataFile)
      .pipe(map((result) => result.find((d) => d.id == id)));
  }

  findPromiseById(
    id: number,
    abortSignal?: AbortSignal
  ): Promise<Dessert | undefined> {
    return toPromise(this.findById(id), abortSignal);
  }
}
