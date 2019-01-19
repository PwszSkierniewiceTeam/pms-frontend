import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule, NativeScriptHttpModule, NativeScriptRouterModule, RouterExtensions } from 'nativescript-angular';
import { NativeScriptAnimationsModule } from 'nativescript-angular/animations';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import * as dialogs from 'tns-core-modules/ui/dialogs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProjectCreateUpdateComponent } from './components/project-create-update/project-create-update.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectUsersComponent } from './components/project-users/project-users.component';
import { ProjectComponent } from './components/project/project.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskCreateUpdateComponent } from './components/task-create-update/task-create-update.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ValidationMessagesComponent } from './components/validation-messages/validation-messages.component';
import { SessionInterceptor } from './interceptors/session.interceptor';
import { NsContainer } from './services/ns-container';
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
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    ProjectListComponent,
    ProjectCreateUpdateComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectUsersComponent,
    TasksComponent,
    TaskComponent,
    TaskCreateUpdateComponent
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
export class AppModule {
  constructor(private routerExtensions: RouterExtensions) {
    NsContainer.dialogs = dialogs;
    NsContainer.routerExtensions = routerExtensions;
  }
}
