import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDragDropModule } from 'ng-drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
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
import { CustomMaterialModule } from './custom-material.module';
import { SessionInterceptor } from './interceptors/session.interceptor';
import { TaskStatusPipe } from './pipes/task-status.pipe';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    ValidationMessagesComponent,
    MainComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    BannerComponent,
    ProjectListComponent,
    ProjectCreateUpdateComponent,
    ProjectComponent,
    ProjectDetailsComponent,
    ProjectUsersComponent,
    TasksComponent,
    TaskComponent,
    TaskStatusPipe,
    TaskCreateUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgDragDropModule.forRoot(),
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
