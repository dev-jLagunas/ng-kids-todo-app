import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListLogicService } from '../../services/todo-list.service';
import { TodoSurpriseComponent } from './todo-surprise/todo-surprise.component';

@Component({
  selector: 'app-todo-item-done',
  standalone: true,
  imports: [CommonModule, TodoSurpriseComponent],
  templateUrl: './todo-item-done.component.html',
  styleUrl: './todo-item-done.component.css',
})
export class TodoItemDoneComponent implements OnInit {
  doneTasks!: any[];
  taskAccomplished: boolean = false;
  constructor(private todoListLogicService: TodoListLogicService) {}

  ngOnInit(): void {
    this.todoListLogicService.doneTasksList.subscribe((doneTasks) => {
      this.doneTasks = doneTasks;
    });

    this.todoListLogicService.taskAccomplished.subscribe((value) => {
      this.taskAccomplished = value;
    });
  }
  onClose(): void {
    this.taskAccomplished = false;
  }

  clearAllDoneTasks(): void {
    this.todoListLogicService.clearAllDoneTasks();
    this.doneTasks = [];
  }
}
