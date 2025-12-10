import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  TitleStrategy,
  withComponentInputBinding,
} from '@angular/router';

import { provideImgixLoader } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { TemplatePageTitleStrategy } from './services/title-strategy.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideImgixLoader('http://localhost:4200/'),
    provideRouter(routes, withComponentInputBinding()),
    { provide: TitleStrategy, useClass: TemplatePageTitleStrategy },
  ],
};
