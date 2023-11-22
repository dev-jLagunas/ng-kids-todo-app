import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio!: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
  }

  loadAudio(src: string): void {
    this.audio.src = `assets/sounds/${src}`;
  }

  play(): void {
    this.audio.play();
  }
}
