import { Component, EventEmitter, Output } from '@angular/core';

interface ServerI {
  serverName: string;
  serverContent: string;
}

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent {
  @Output('srvCreated') serverCreated = new EventEmitter<ServerI>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<ServerI>();
  // newServerName = '';
  newServerContent = '';

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({
      /* retrived from : (click)="onAddServer(serverNameInput)",
      thanks to the local reference : #serverNameInput */
      serverName: nameInput.value,
      // serverName: this.newServerName,
      serverContent: this.newServerContent,
    });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      // serverName: this.newServerName,
      serverName: nameInput.value,
      serverContent: this.newServerContent,
    });
  }
}
