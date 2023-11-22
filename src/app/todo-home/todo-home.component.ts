import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoUserInfoComponent } from './todo-user-info/todo-user-info.component';
import { TodoListLogicService } from '../services/todo-list.service';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoItemDoneComponent } from './todo-item-done/todo-item-done.component';
import { TodoCounterComponent } from './todo-counter/todo-counter.component';

@Component({
  selector: 'app-todo-home',
  standalone: true,
  imports: [
    CommonModule,
    TodoCounterComponent,
    TodoItemComponent,
    TodoItemDoneComponent,
    TodoUserInfoComponent,
    TodoCounterComponent,
  ],
  templateUrl: './todo-home.component.html',
  styleUrl: './todo-home.component.css',
})
export class TodoHomeComponent implements OnInit {
  isUserInfoVisible = true;
  userName!: string;
  constructor(private todoListLogicService: TodoListLogicService) {}

  ngOnInit(): void {
    this.todoListLogicService.getUserName().subscribe((name) => {
      this.userName = name;
      this.isUserInfoVisible = !name;
    });
  }

  handleNameEntered(): void {
    this.isUserInfoVisible = false;
  }

  changeUser(): void {
    localStorage.removeItem('userName');
    this.todoListLogicService.setUserName('');
    this.isUserInfoVisible = true;
  }

  get isUserNameInLocalStorage(): boolean {
    return !!localStorage.getItem('userName');
  }

  startFresh(): void {
    localStorage.clear();
    this.todoListLogicService.startFresh();
    this.todoListLogicService.setUserName('');
    this.isUserInfoVisible = true;
  }
}
