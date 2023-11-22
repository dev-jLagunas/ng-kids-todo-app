import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-start-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-app.component.html',
  styleUrl: './start-app.component.css',
})
export class StartAppComponent {
  displayYesMessage: boolean = false;
  displayNoMessage: boolean = false;
  displayMaybeMessage: boolean = false;

  constructor(private router: Router, private audioService: AudioService) {}

  handleSelection(value: string): void {
    switch (value) {
      case 'yes':
        this.playAudio('start.mp3');
        this.displayYesMessage = true;
        timer(3000).subscribe(() => {
          this.router.navigate(['/home']);
          this.displayYesMessage = false;
        });
        break;
      case 'no':
        this.playAudio('trombone-sad.mp3');
        this.displayNoMessage = true;
        timer(4000).subscribe(() => {
          this.displayNoMessage = false;
        });
        break;
      case 'maybe':
        this.playAudio('crickets.mp3');
        this.displayMaybeMessage = true;
        timer(3000).subscribe(() => {
          this.displayMaybeMessage = false;
        });
        break;
      default:
        break;
    }
  }

  private playAudio(audioFileName: string): void {
    this.audioService.loadAudio(audioFileName);
    this.audioService.play();
  }
}
