import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user/:id', component: UserComponent },
  {
    path: 'todos/:userId',
    loadComponent: () =>
      import('./todo-management/todo-management.component').then(
        (m) => m.TodoManagementComponent
      ),
  },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
];

//export const routes: Routes = [];
