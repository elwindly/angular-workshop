import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
} from '@angular/router';

import { provideImgixLoader } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { TemplatePageTitleStrategy } from './services/title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideImgixLoader('http://localhost:4200/'),
    provideRouter(routes, withComponentInputBinding()),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ],
};
