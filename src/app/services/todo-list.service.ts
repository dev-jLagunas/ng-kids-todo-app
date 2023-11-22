import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoListLogicService {
  private userName = new BehaviorSubject<string>(
    localStorage.getItem('userName') || ''
  );
  private todoList = new BehaviorSubject<TodoItem[]>([]);
  public doneTasksList = new BehaviorSubject<TodoItem[]>([]);
  taskAccomplished = new BehaviorSubject<boolean>(false);
  startFreshEvent = new BehaviorSubject<void>(undefined);

  constructor() {
    const savedTodoList = localStorage.getItem('todoList');
    if (savedTodoList) {
      this.todoList.next(JSON.parse(savedTodoList));
    }

    const savedDoneList = localStorage.getItem('doneTasksList');
    if (savedDoneList) {
      this.doneTasksList.next(JSON.parse(savedDoneList));
    }
  }

  setUserName(name: string): void {
    localStorage.setItem('userName', name);
    this.userName.next(name);
  }

  getUserName(): BehaviorSubject<string> {
    return this.userName;
  }

  addItem(text: string): void {
    const newItem: TodoItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: text,
      completed: false,
    };

    const currentList = this.todoList.getValue();
    currentList.push(newItem);
    this.todoList.next(currentList);

    localStorage.setItem('todoList', JSON.stringify(currentList));
  }

  getTodoList(): BehaviorSubject<TodoItem[]> {
    return this.todoList;
  }

  deleteItem(id: string): void {
    const currentList = this.todoList.getValue();
    const index = currentList.findIndex((item) => item.id === id);

    if (index !== -1) {
      currentList.splice(index, 1);
      this.todoList.next(currentList);
      localStorage.setItem('todoList', JSON.stringify(currentList));
    }
  }

  markDone(id: string): void {
    const currentTodoList = this.todoList.getValue();
    const currentDoneList = this.doneTasksList.getValue();

    const index = currentTodoList.findIndex((item) => item.id === id);

    if (index !== -1) {
      const doneTask = currentTodoList.splice(index, 1)[0];
      doneTask.completed = true;
      currentDoneList.push(doneTask);

      this.todoList.next(currentTodoList);
      this.doneTasksList.next(currentDoneList);

      localStorage.setItem('todoList', JSON.stringify(currentTodoList));
      localStorage.setItem('doneTasksList', JSON.stringify(currentDoneList));

      this.markTaskAccomplished();
    }
  }

  markTaskAccomplished(): void {
    this.taskAccomplished.next(true);
  }

  getDoneTasksAfterMarkingDone(id: string): any[] {
    this.markDone(id);
    return this.doneTasksList.getValue();
  }

  getDoneTasks(): any[] {
    return this.doneTasksList.getValue();
  }

  clearAllTasks(): void {
    this.todoList.next([]);
    localStorage.removeItem('todoList');
  }

  clearAllDoneTasks(): void {
    this.doneTasksList.next([]);
    localStorage.removeItem('doneTasksList');
  }

  startFresh(): void {
    localStorage.clear();
    this.setUserName('');
    this.clearAllTasks();
    this.clearAllDoneTasks();
    this.startFreshEvent.next();
  }
}
