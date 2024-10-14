import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {importProvidersFrom} from '@angular/core';
import {AppComponent} from './app/app.component';
import {AppRoutingModule} from './app/app-routing.module';
import {BrowserModule, bootstrapApplication} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(BrowserModule, AppRoutingModule), provideAnimations(), provideStore()],
}).catch(err => console.error(err));
