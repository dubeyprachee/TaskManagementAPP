import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskCreateComponent } from './components/task-create/task-create';
import { TaskUpdateComponent } from './components/task-update/task-update';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/create', component: TaskCreateComponent, canActivate: [AuthGuard] },
  { path: 'tasks/update/:id', component: TaskUpdateComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];
