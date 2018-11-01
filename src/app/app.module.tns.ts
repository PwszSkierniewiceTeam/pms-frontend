import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptHttpModule, NativeScriptRouterModule } from 'nativescript-angular';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { SessionInterceptor } from './interceptors/session.interceptor';
import { StorageService } from './services/storage.service';
import { StorageTnsService } from './services/storage.tns.service';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    ValidationMessagesComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ProjectListComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptHttpModule,
    NativeScriptRouterModule,
    NativeScriptAnimationsModule,
    NativeScriptHttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: StorageService,
      useClass: StorageTnsService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
