import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListLogicService } from '../../services/todo-list.service';

@Component({
  selector: 'app-todo-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-counter.component.html',
  styleUrl: './todo-counter.component.css',
})
export class TodoCounterComponent implements OnInit {
  doneTasksCount = 0;
  goal: number = 10;
  encouragingSentence = '';

  constructor(private todoListLogicService: TodoListLogicService) {}

  ngOnInit(): void {
    this.subscribeToDoneTasksList();
    this.todoListLogicService.startFreshEvent.subscribe(() => {
      this.doneTasksCount = 0;
      this.goal = 10;
      this.encouragingSentence = '';
    });
  }

  subscribeToDoneTasksList(): void {
    this.todoListLogicService.doneTasksList.subscribe((doneTasks) => {
      this.doneTasksCount = doneTasks.length;
      this.goal = 10 - this.doneTasksCount;
      this.encouragingSentence = this.getEncouragingSentence(
        this.doneTasksCount
      );
    });
  }

  getEncouragingSentence(count: number): string {
    switch (count) {
      case 1:
        return 'Great start!';
      case 2:
        return 'Keep going!';
      case 3:
        return 'Good job!';
      case 4:
        return 'Fantastic work!';
      case 5:
        return "You're on a roll!";
      case 6:
        return 'Amazing effort!';
      case 7:
        return 'Keep up the good work!';
      case 8:
        return "You're doing great!";
      case 9:
        return 'Almost there!';
      case 10:
        return "Excellent! You've reached 10 tasks!";
      default:
        return 'Keep it up!';
    }
  }
}
