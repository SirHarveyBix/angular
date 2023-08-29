import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  imports: [NgFor],
})
export class SignalsComponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2); // computing value that depend on signals

  constructor() {
    effect(() => console.log(this.counter())); // rexecute this code every time this.counter changes, works as useEffect in React
  }

  increment() {
    // this.counter.update((previousCounter) => previousCounter + 1);
    this.counter.set(this.counter() + 1);
    this.actions.mutate((previousActions) => previousActions.push('INCREMENT'));
  }

  decrement() {
    // this.counter.update((previousCounter) => previousCounter - 1);
    this.counter.set(this.counter() - 1);
    this.actions.update((previousActions) => [...previousActions, 'DECREMENT']); // not previousActions.push(), only with mutate
  }
}
