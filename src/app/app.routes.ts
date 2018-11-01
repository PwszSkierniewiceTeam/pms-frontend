import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { RegisterComponent } from './components/register/register.component';

import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: ProjectListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
