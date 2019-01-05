import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ProjectCreateUpdateComponent } from './components/project-create-update/project-create-update.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectComponent } from './components/project/project.component';
import { RegisterComponent } from './components/register/register.component';
import { TaskCreateUpdateComponent } from './components/task-create-update/task-create-update.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'project',
    component: MainComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: ProjectListComponent
      },
      {
        path: 'create',
        component: ProjectCreateUpdateComponent
      },
      {
        path: ':projectId/update',
        component: ProjectCreateUpdateComponent
      },
      {
        path: ':projectId',
        component: ProjectComponent
      },
      {
        path: ':projectId/task',
        component: TaskCreateUpdateComponent
      },
      {
        path: ':projectId/task/:taskId',
        component: TaskCreateUpdateComponent
      }
    ]
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
