import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { CustomMaterialModule } from './custom-material.module';
import { SessionInterceptor } from './interceptors/session.interceptor';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    ValidationMessagesComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    BannerComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomMaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true
    },
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
