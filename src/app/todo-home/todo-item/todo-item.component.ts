import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListLogicService } from '../../services/todo-list.service';
import { TodoItemDoneComponent } from '../todo-item-done/todo-item-done.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemDoneComponent],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent implements OnInit {
  todoText: string = '';
  todoList: any[] = [];

  constructor(private todoService: TodoListLogicService) {}

  ngOnInit() {
    this.todoService.getTodoList().subscribe((list) => {
      this.todoList = list;
    });
  }

  saveTodo(): void {
    if (!this.todoText.trim()) {
      return;
    }

    this.todoService.addItem(this.todoText);
    this.todoService.getTodoList().subscribe((list) => {
      this.todoList = list;
      console.log(this.todoList);
    });
    this.todoText = '';
  }

  deleteTask(id: string): void {
    this.todoService.deleteItem(id);
  }

  markTaskAsDone(id: string): void {
    this.todoService.markDone(id);
  }
}
