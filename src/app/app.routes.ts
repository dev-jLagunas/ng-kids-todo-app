import { Routes } from '@angular/router';
import { StartAppComponent } from './start-app/start-app.component';
import { TodoHomeComponent } from './todo-home/todo-home.component';

export const routes: Routes = [
  { path: '', component: StartAppComponent },
  { path: 'home', component: TodoHomeComponent },
];
