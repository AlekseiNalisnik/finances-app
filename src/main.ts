/// <reference types="@angular/localize" />

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.route';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

registerLocaleData(localeRu);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'ru' },
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules), withDebugTracing()),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
  ]
}).catch(err => console.error(err));