import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListLogicService } from '../../services/todo-list.service';

@Component({
  selector: 'app-todo-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-user-info.component.html',
  styleUrl: './todo-user-info.component.css',
})
export class TodoUserInfoComponent implements OnInit {
  @Output() nameEntered = new EventEmitter<void>();
  userName!: string;
  constructor(private todoListLogicService: TodoListLogicService) {}

  ngOnInit(): void {
    this.todoListLogicService.getUserName().subscribe((name) => {
      this.userName = name;
    });
  }

  handleNameInput(name: string): void {
    if (name.trim() !== '') {
      this.todoListLogicService.setUserName(name);
      console.log('User name saved:', name);
      this.nameEntered.emit();
    } else {
      console.log('No name entered');
    }
  }

  get isUserNameInLocalStorage(): boolean {
    return !!localStorage.getItem('userName');
  }

  changeUser(): void {
    localStorage.removeItem('userName');
    this.todoListLogicService.setUserName('');
  }
}
