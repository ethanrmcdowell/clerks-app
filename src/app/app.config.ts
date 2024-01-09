import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), DatePipe, provideHttpClient(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"clerks-app","appId":"1:684048276862:web:98d88425fa660a8d2e672f","storageBucket":"clerks-app.appspot.com","apiKey":"AIzaSyAFGLUNlaJsk6a88i6bpg6dSFmyK00Ee0E","authDomain":"clerks-app.firebaseapp.com","messagingSenderId":"684048276862","measurementId":"G-9WT8184MJY"}))), importProvidersFrom(provideAuth(() => getAuth()))]
};
