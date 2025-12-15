import { ErrorHandler, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { LoggedInService } from './services/logged-in.service';

export const routes: Routes = [
  {
    path: 'intro',
    title: 'intro',
    canActivate: [() => inject(LoggedInService).isLoggedIn()],
    loadComponent: () =>
      import('./containers/intro/intro.component').then(
        (m) => m.IntroComponent
      ),
  },
  {
    path: 'angular-14',
    title: 'Angular 14',
    canActivate: [() => inject(LoggedInService).isLoggedIn()],
    loadComponent: () =>
      import('./containers/angular-14/angular-14.component').then(
        (m) => m.Angular14Component
      ),
  },
  {
    path: 'angular-15',
    title: 'Angular 16',
    loadComponent: () =>
      import('./containers/angular-15/angular-15.component').then(
        (m) => m.Angular15Component
      ),
  },
  {
    path: 'angular-16',
    loadComponent: () =>
      import('./containers/angular-16/angular-16.component').then(
        (m) => m.Angular16Component
      ),
    data: {
      inputData:
        'Passing router data as component inputs (withComponentInputBinding)',
    },
  },
  {
    path: 'angular-17',
    loadComponent: () =>
      import('./containers/angular-17/angular-17.component').then(
        (m) => m.Angular17Component
      ),
  },
  {
    path: 'angular-18',
    loadComponent: () =>
      import('./containers/angular-18/angular-18.component').then(
        (m) => m.Angular18Component
      ),
  },
  {
    path: 'angular-19',
    loadComponent: () =>
      import('./containers/angular-19/angular-19.component').then(
        (m) => m.Angular19Component
      ),
  },
  {
    path: 'angular-20',
    loadComponent: () =>
      import('./containers/angular-20/angular-20.component').then(
        (m) => m.Angular20Component
      ),
  },
  {
    path: 'angular-21',
    loadComponent: () =>
      import('./containers/angular-21/angular-21.component').then(
        (m) => m.Angular21Component
      ),
  },
  {
    path: 'test-redirect-page',
    redirectTo: ({ queryParams }) => {
      const errorHandler = inject(ErrorHandler);
      const userIdParam = queryParams['userId'];
      if (userIdParam) {
        return `/angular-18`;
      }
      errorHandler.handleError(
        new Error('Attempted navigation to user page without user ID.')
      );
      return `/angular-19`;
    },
  },

  { path: '', redirectTo: 'intro', pathMatch: 'full' },
];
