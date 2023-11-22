import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpRequestsService } from '../../../services/http-requests.service';
import { AudioService } from '../../../services/audio.service';

@Component({
  selector: 'app-todo-surprise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-surprise.component.html',
  styleUrl: './todo-surprise.component.css',
})
export class TodoSurpriseComponent implements OnInit {
  joke: string | undefined;
  @Output() close = new EventEmitter<void>();
  constructor(
    private httpService: HttpRequestsService,
    private audioService: AudioService
  ) {}

  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    this.fetchJoke();
  }

  fetchJoke(): void {
    this.playAudio('accomplished.mp3');
    this.httpService.getRandomJoke().subscribe(
      (data: string) => {
        this.joke = data;
      },
      (error) => {
        console.error('error fetching joke', error);
      }
    );
  }

  private playAudio(audioFileName: string): void {
    this.audioService.loadAudio(audioFileName);
    this.audioService.play();
  }
}
