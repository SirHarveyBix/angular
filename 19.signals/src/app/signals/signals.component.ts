import { NgFor } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  imports: [NgFor],
})
export class SignalsComponent {
  actions: string[] = [];
  counter = signal(0);

  increment() {
    this.counter++;
    this.actions.push('INCREMENT');
  }

  decrement() {
    this.counter--;
    this.actions.push('DECREMENT');
  }
}
