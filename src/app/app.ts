import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
<mat-sidenav-container class="sidenav-container" *ngIf="authService.isLoggedIn(); else loginLayout">
  <mat-sidenav mode="side" opened class="sidenav">
    <mat-toolbar color="primary">Menu</mat-toolbar>
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active"><span matListItemTitle>Dashboard</span></a>
      <a mat-list-item routerLink="/tasks/create" routerLinkActive="active"><span matListItemTitle>Create Tasks</span></a>
      <a mat-list-item routerLink="/tasks" routerLinkActive="active"><span matListItemTitle>Tasks</span></a>
      <a mat-list-item routerLink="/users" routerLinkActive="active"><span matListItemTitle>Users</span></a>
      <button mat-list-item (click)="logout()"><span matListItemTitle>Logout</span></button>
    </mat-nav-list>
  </mat-sidenav>
  <mat-sidenav-content>
    <mat-toolbar color="primary"><span>Task Management System</span></mat-toolbar>
    <router-outlet></router-outlet>
  </mat-sidenav-content>
</mat-sidenav-container>
<ng-template #loginLayout><router-outlet></router-outlet></ng-template>
  `,
  styles: [`
.sidenav-container { height: 100vh; }
.sidenav { width: 200px; }
.active { background: rgba(0, 0, 0, 0.04); }
  `],
})
export class App {
  constructor(public authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
